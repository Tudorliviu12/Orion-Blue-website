self.addEventListener('message', function(e) {
    console.log("Worker a primit mesajul:", e.data);

    self.postMessage(e.data);
});
