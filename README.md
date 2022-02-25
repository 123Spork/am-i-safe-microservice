## Text to speech proxy for Google TTS
```
npm install

npm run start-dev
```
This repository runs a proxy service against localhost:5000 which hits google's text to speech API. Useful for hitting from a locally running html script without having to worry about CORS.

Currently this only performs a single function, to turn a piece of text into a TTS base64 string.