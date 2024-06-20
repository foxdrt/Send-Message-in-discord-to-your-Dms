const channelsID = [];
let oldXHRdone = false;
const xhr = new XMLHttpRequest();

const button = document.getElementById("Btn");
button.addEventListener("click", function () {
  const token = document.getElementById("Token").value;
  const Message = document.getElementById("Message").value;

  xhr.open("GET", "https://discord.com/api/users/@me/channels");
  xhr.setRequestHeader("authorization", token);
  xhr.responseType = "json";
  xhr.send();

  xhr.onload = () => {
    for (let i = 0; i < xhr.response.length; i++) {
      channelsID.push({
        channelID: xhr.response[i].id,
      });
    }
    oldXHRdone = true;
    if (oldXHRdone) {
      for (let i = 0; i < channelsID.length; i++) {
        const xhrSendMessage = new XMLHttpRequest();
        let message = {
          content: Message,
        };
        xhrSendMessage.open(
          "POST",
          `https://discord.com/api/v9/channels/${channelsID[i].channelID}/messages`
        );
        xhrSendMessage.setRequestHeader("authorization", token);
        xhrSendMessage.setRequestHeader("content-type", "application/json");
        xhrSendMessage.send(JSON.stringify(message));
        xhrSendMessage.onload = () => {
          if (xhrSendMessage.status === 200) {
            console.log("Message sent successfully!");
          } else {
            console.error(
              "Failed to send message. Status code:",
              xhrSendMessage.status
            );
          }
        };
      }
    }
  };
});
