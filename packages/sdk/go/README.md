# Kontenbase

This is the official Go SDK for Kontenbase API.

Kontenbase is a no-code backend API platform or Backend as a Service (BaaS) that allows you to create a backend API as fast as possible. We make it easy for developers to build backend API without having to touch backend code at all.

Visit [Kontenbase](https://kontenbase.com/) for more information and see [our documentation](https://docs.kontenbase.com/) for more technical details.

## API Documentation

For API documentation, visit [Kontenbase API Reference](https://docs.kontenbase.com/).

## Installation

```bash
go get -u github.com/kontenbase/kontenbase
```

## Usage

Before you begin, you need to sign up on [Kontenbase Dashboard](https://app.kontenbase.com/) to retrieve an **API key** of your project.

### Create a client
```go
client := kontenbase.NewClient("YOUR_API_KEY", kontenbase.DefaultURL())
```

# Authentication

### Register
```go
resp, err := client.Auth.Register(client.RegisterParams{
  Email: "user@mail.com",
  Password: "password",
  FirstName: "Ega",
})
```

### Login
```go
resp, err := client.Auth.Login(client.LoginParams{
  Email: "user@mail.com",
  Password: "password",
})
```

### Get user info
```go
resp, err := client.Auth.User()
```

### Update user info
```go
resp, err := client.Auth.Update(map[string]interface{}{
  "firstName": "Ega",
})
```

### Logout
```go
resp, err := client.Auth.Logout()
```

## Database

### Create a new record
```go
resp, err := client.Service("posts").Create(map[string]interface{}{
  "name" : "Post 1",
  "notes": "Hello Kontenbase",
})
```

### Get a record by Id
```go
resp, err := client.Service("posts").GetByID("605a251d7b8678bf6811k3b1")
```

### Find records

**Get all records**
```go
resp, err := client.Service("posts").Find()
```

**Find records and modify the result**
```go
resp, err := client.Service("posts").Find()
  .SetLimit(10)
  .SetSkip(10)
  .SetSelect([]interface{}{"name", "notes"})
  .SetLookup("*")
```

**Find records with criteria**
```go
resp, err := client.Service("posts").Find()
  .SetWhere(map[string]interface{}{
    "name": "Ega",
    "notes": map[string]interface{}{
      "$contains": "hello",
    },
    "number": map[string]interface{}{
      "$gte": 10,
    },
    "status" map[string]interface{}{
      "$in": []interface{}{"todo", "done"},
    },
  })
```

### Update record
```go
resp, err := client.Service("posts").UpdateByID("605a251d7b8678bf6811k3b1", map[string]interface{}{
    "notes": "Hello world",
})
```

### Delete record
```go
resp, err := client.Service("posts").DeleteByID("605a251d7b8678bf6811k3b1")
```

### Link record
```go
resp, err := client.Service("posts").Link("605a251d7b8678bf6811k3b1", map[string]interface{}{
    "categories": "61d26e8e2adb12b85c33029c",
})
```

### Unlink record
```go
resp, err := client.Service("posts").Unlink("605a251d7b8678bf6811k3b1", map[string]interface{}{
    "categories": "61d26e8e2adb12b85c33029c",
})
```

### Count total records
**Count all records**
```go
resp, err := client.Service("posts").Count()
```

**Count records that match given criteria**
```go
resp, err := client.Service("posts").Count().SetWhere(map[string]interface{}{
    "name": "Ega",
  })
```

## Storage

### Upload a file
```go
file, err := os.Open("your_file.txt")
if err != nil {
  return err
}

defer file.Close()

resp, err := client.Storage.Upload(file)
```

## Feedback
Please use our [GitHub Issues](https://github.com/kontenbase/feedback) for high-level feedback. Also you can join our [Discord server](https://a.kontenbase.com/discord).