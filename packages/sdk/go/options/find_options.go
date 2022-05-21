package options

type FindOptions struct {
	Or     interface{} `json:"$or,omitempty"`
	Limit  *int        `json:"$limit,omitempty"`
	Lookup interface{} `json:"$lookup,omitempty"`
	Select interface{} `json:"$select,omitempty"`
	Skip   *int        `json:"$skip,omitempty"`
	Sort   interface{} `json:"$sort,omitempty"`
	Where  interface{} `json:"-"`
}

func Find() *FindOptions {
	return &FindOptions{}
}

func (f *FindOptions) SetOr(or interface{}) *FindOptions {
	f.Or = or
	return f
}

func (f *FindOptions) SetLimit(i int) *FindOptions {
	f.Limit = &i
	return f
}

func (f *FindOptions) SetLookup(l interface{}) *FindOptions {
	f.Lookup = l
	return f
}

func (f *FindOptions) SetSelect(s interface{}) *FindOptions {
	f.Select = s
	return f
}

func (f *FindOptions) SetSkip(i int) *FindOptions {
	f.Skip = &i
	return f
}

func (f *FindOptions) SetSort(s interface{}) *FindOptions {
	f.Sort = s
	return f
}

func (f *FindOptions) SetWhere(w interface{}) *FindOptions {
	f.Where = w
	return f
}
