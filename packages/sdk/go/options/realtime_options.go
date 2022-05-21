package options

const (
	RealtimeAll    = "*"
	RealtimeCreate = "CREATE_RECORD"
	RealtimeUpdate = "UPDATE_RECORD"
	RealtimeDelete = "DELETE_RECORD"
	RealtimeError  = "ERROR"
)

type SubscribeOptions struct {
	Event     string
	Where     interface{}
	OnMessage func(event string, payload map[string]interface{}) error
	OnError   func(event string, payload map[string]interface{}) error
}
