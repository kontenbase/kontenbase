package options

type CountOptions struct {
	Or    interface{} `json:"$or,omitempty"`
	Where interface{} `json:"-"`
}

func Count() *CountOptions {
	return &CountOptions{}
}

func (c *CountOptions) SetOr(or interface{}) *CountOptions {
	c.Or = or
	return c
}

func (c *CountOptions) SetWhere(w interface{}) *CountOptions {
	c.Where = w
	return c
}
