package options

type GetByIDOptions struct {
	Lookup interface{}
	Select interface{}
}

func GetByID() *GetByIDOptions {
	return &GetByIDOptions{}
}

func (g *GetByIDOptions) SetLookup(l interface{}) *GetByIDOptions {
	g.Lookup = l
	return g
}

func (g *GetByIDOptions) SetSelect(s interface{}) *GetByIDOptions {
	g.Select = s
	return g
}
