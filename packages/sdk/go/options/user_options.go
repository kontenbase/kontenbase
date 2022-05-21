package options

type UserOptions struct {
	Lookup interface{}
}

func User() *UserOptions {
	return &UserOptions{}
}

func (u *UserOptions) SetLookup(l interface{}) *UserOptions {
	u.Lookup = l
	return u
}
