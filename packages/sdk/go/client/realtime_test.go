package client

import (
	"fmt"
	"testing"

	"github.com/kontenbase/kontenbase/options"
)

var realtimeClient = NewRealtimeClient("https://api.kontenbase.com/stream", apiKey, authClient)

func TestRealtime(t *testing.T) {
	handler := &eventHandlerTest{}

	_, err := realtimeClient.Subscribe("Movies", options.SubscribeOptions{
		Event:     options.RealtimeAll,
		OnMessage: handler.OnMessage,
		OnError:   handler.OnError,
	})

	if err != nil {
		t.Fatal(err)
	}

	select {}
}

type eventHandlerTest struct{}

func (e *eventHandlerTest) OnMessage(event string, payload map[string]interface{}) error {
	fmt.Println(event)
	return nil
}

func (e *eventHandlerTest) OnError(event string, payload map[string]interface{}) error {
	fmt.Println(payload)
	return nil
}
