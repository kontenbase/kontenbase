package client

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/kontenbase/kontenbase/options"
	"github.com/kontenbase/kontenbase/utils"

	"github.com/centrifugal/centrifuge-go"
)

type RealtimeClient struct {
	url          string
	apiKey       string
	subcriptions map[string]interface{}

	auth       *AuthClient
	httpClient *HTTPClient
	wsClient   *centrifuge.Client
}

func NewRealtimeClient(url string, apiKey string, auth *AuthClient) *RealtimeClient {
	return &RealtimeClient{
		url:          url,
		apiKey:       apiKey,
		auth:         auth,
		subcriptions: map[string]interface{}{},
		httpClient:   NewHTTPClient(url+"/channel/"+apiKey, nil),
	}
}

func (r *RealtimeClient) centrifuge(handler *eventHandler) *centrifuge.Client {
	url := strings.Replace(r.url, "http", "ws", 1) + "/connection/" + r.apiKey + "/websocket?token=82abe1de7546d850cc7eaa995c913f40" + r.auth.Token()

	c := centrifuge.NewJsonClient(url, centrifuge.DefaultConfig())

	c.OnConnect(handler)
	c.OnError(handler)

	r.wsClient = c

	return c
}

func (r *RealtimeClient) getChannel(name string) *string {
	resp, err := r.httpClient.Get("/"+name, nil)
	if err != nil {
		return nil
	}

	data := resp.Data.(map[string]interface{})
	channel := data["name"].(string)
	return &channel
}

type Callback func(event string, payload map[string]interface{}) error

func (r *RealtimeClient) Subscribe(name string, opts options.SubscribeOptions) (string, error) {
	key := strings.ReplaceAll(strings.ToLower(name), " ", "-") + "-" + fmt.Sprint(time.Now().UnixMilli())
	lastSubscribe := r.subcriptions[name]

	if lastSubscribe != nil {
		subs := lastSubscribe.(*centrifuge.Subscription)
		subs.Unsubscribe()
	}

	getChannel := r.getChannel(name)
	if getChannel == nil {
		return key, errors.New("no channels found")
	}

	filter := ""

	if opts.Where != nil {
		stringify, _ := utils.Marshal(opts.Where.(map[string]interface{}))
		filter = ":" + stringify
	}

	if opts.Event == "" {
		opts.Event = options.RealtimeAll
	}

	handler := &eventHandler{
		onError: opts.OnError,
	}

	c := r.centrifuge(handler)

	err := c.Connect()
	if err != nil {
		return key, err
	}

	channel := *getChannel + ":" + opts.Event + filter

	sub, err := c.NewSubscription(channel)
	if err != nil {
		return key, err
	}

	subHandler := &subEventHandler{
		onMessage: opts.OnMessage,
	}

	sub.OnPublish(subHandler)

	err = sub.Subscribe()
	if err != nil {
		return key, err
	}

	r.subcriptions[key] = c

	return key, nil
}

func (r *RealtimeClient) Close() error {
	return r.wsClient.Close()
}

func (r *RealtimeClient) Unsubscribe(key string) error {
	subscription := r.subcriptions[key]
	if subscription == nil {
		return errors.New("subscription not found")
	}

	subs := subscription.(*centrifuge.Client)
	subs.Disconnect()
	delete(r.subcriptions, key)
	return nil
}

type eventHandler struct {
	onError Callback
}

func (h *eventHandler) OnConnect(_ *centrifuge.Client, e centrifuge.ConnectEvent) {
	log.Printf("Connected")
}

func (h *eventHandler) OnError(_ *centrifuge.Client, e centrifuge.ErrorEvent) {
	if h.onError != nil {
		err := h.onError(options.RealtimeError, map[string]interface{}{
			"message": e.Message,
		})

		if err != nil {
			log.Printf("Callback error: %s", err)
		}
	}
}

type subEventHandler struct {
	onMessage Callback
}

func (s *subEventHandler) OnPublish(sub *centrifuge.Subscription, e centrifuge.PublishEvent) {
	if s.onMessage != nil {
		var msg Message
		json.Unmarshal(e.Data, &msg)

		err := s.onMessage(msg.Event, msg.Payload)
		if err != nil {
			log.Printf("Callback error: %s", err)
		}
	}
}

type Message struct {
	Event   string                 `json:"eventType"`
	Payload map[string]interface{} `json:"payload"`
}
