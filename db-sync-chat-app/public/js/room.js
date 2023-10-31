const roomId = location.pathname.split("/")[2];
const eventArea = document.querySelector("#event-area");
const messageInput = document.querySelector("#message-input");
const sendButton = document.querySelector("#send-button");

function displayMessage(event) {
  const html = `
  <div class="flex flex-col gap-1 border rounded-md p-2">
    <div class="flex justify-between">
      <div class="text-sm text-gray-500">
        ${event.user.firstName} ${event.user.lastName}
      </div>
      <div class="text-sm text-gray-500">
        ${new Date(event.timestamp).toLocaleString("en-NG", {
          timeStyle: "short",
          dateStyle: "short",
          hour12: true,
        })}
      </div>
    </div>
    <p class="text-base">${event.data}</p>
  </div>
`;

  eventArea.insertAdjacentHTML("beforeend", html);
}

function displayUserJoined(event) {
  const html = `
  <div class="mx-auto bg-gray-100 text-sm text-gray-500 rounded-md p-1">
    ${new Date(event.timestamp).toLocaleString("en-NG", {
      timeStyle: "short",
      dateStyle: "short",
      hour12: true,
    })} - ${event.user.firstName}
      ${event.user.lastName} joined.
  </div>`;

  eventArea.insertAdjacentHTML("beforeend", html);
}

function displayUserLeft(event) {
  const html = `
  <div class="mx-auto bg-gray-100 text-sm text-gray-500 rounded-md p-1">
    ${new Date(event.timestamp).toLocaleString("en-NG", {
      timeStyle: "short",
      dateStyle: "short",
      hour12: true,
    })} - ${event.user.firstName}
      ${event.user.lastName} left.
  </div>`;

  eventArea.insertAdjacentHTML("beforeend", html);
}

const handlers = {
  message: displayMessage,
  "user-joined": displayUserJoined,
  "user-left": displayUserLeft,
};

const wsHost = location.origin.replace(/^http?/, "ws");
const primus = new Primus(wsHost);

primus.on("open", () => {
  console.log("Connected to server");

  primus.on("data", (data) => {
    handlers[data.title](data);

    window.scroll({
      top: document.body.scrollHeight,
    });
  });
});

window.addEventListener("load", () => {
  primus.write({
    title: "user-joined",
    roomId,
  });
});

window.addEventListener("unload", () => {
  primus.write({
    title: "user-left",
    roomId,
  });
});

function sendMessage() {
  const message = messageInput.value;
  messageInput.value = "";

  primus.write({
    title: "message",
    roomId,
    data: message,
  });
}

sendButton.addEventListener("click", sendMessage);
messageInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});
