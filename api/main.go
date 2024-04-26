package main

import (
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/messaging"
	"google.golang.org/api/option"
)

//go:embed firebase-config.json
var configData string

func init() {
	// Initialize Firebase
	ctx := context.Background()
	opt := option.WithCredentialsJSON([]byte(configData))
	app, err := firebase.NewApp(ctx, nil, opt)
	if err != nil {
		log.Fatalf("Firebase initialization error: %v\n", err)
	}

	// Obtain a messaging.Client from the App.
	client, err = app.Messaging(ctx)
	if err != nil {
		log.Fatalf("error getting Messaging client: %v\n", err)
	}
}

var client *messaging.Client

func main() {

	http.HandleFunc("/push", corsHandler(HandlerRequest()))
	port := os.Getenv("PORT")
	if len(port) == 0 {
		port = "8080"
	}
	if err := http.ListenAndServe(fmt.Sprintf(":%s", port), nil); err != nil {
		log.Fatal(err)
	}
}

func HandlerRequest() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)
		if r.Method != http.MethodPost {
			w.WriteHeader(http.StatusNotFound)
			return
		}
		data := NotificationData{}
		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			w.Write([]byte(err.Error()))
			w.WriteHeader(http.StatusNotFound)
			return
		}
		if err := SendPush(r.Context(), data); err != nil {
			w.Write([]byte(err.Error()))
			w.WriteHeader(http.StatusNotFound)
			return
		}
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func corsHandler(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			enableCors(&w)
			w.WriteHeader(http.StatusOK)
			return
		} else {
			h.ServeHTTP(w, r)
		}
	}
}

type NotificationData struct {
	ImageUrl *string  `json:"image_url"`
	Tokens   []string `json:"tokens"`
}

func SendPush(ctx context.Context, data NotificationData) error {
	image := ""
	if data.ImageUrl != nil {
		image = *data.ImageUrl
	}
	multiMessages := &messaging.MulticastMessage{
		Notification: &messaging.Notification{
			Title:    "Receibiste una nueva receta!!",
			Body:     "Entra a la app para revisar la receta",
			ImageURL: image,
		},
		Tokens: data.Tokens,
	}
	br, err := client.SendEachForMulticast(context.Background(), multiMessages)
	if err != nil {
		log.Fatalln(err)
	}
	fmt.Printf("%v", br)
	return nil
}
