window.addEventListener('DOMContentLoaded', () => {
  'use strict';

  function checkIsGreeting(message) {
    return ['hello', 'hi', 'salute', 'hail', 'salaam', 'howdy', "what's up"]
      .includes(message.toLowerCase().trim());
  }

  function* generateAnswer() {
    yield 'Hello, I am J.A.R.V.I.S.';
    yield "I believe I've already said it, but, sure, hello again!";
    yield 'You are malfunctioning';
    yield 'I believe your intentions to be hostile.';
    while (true) {
      yield 'I will not respond to that.';
    }
  }

  function printOwnMessage() {
    messageArea.innerHTML += `
      <div class="message my-message">${input.value}</div>
    `;
  }

  function printJarvisMessage(message) {
    messageArea.innerHTML += `
      <div class="message jarvis-message">${message}</div>
    `;
  }

  function sendMessage() {
    printOwnMessage();

    if (input.value !== '') {
      if (checkIsGreeting(input.value)) {
        printJarvisMessage(answerGen.next().value);
      } else {
        printJarvisMessage("I don't understand.");
      }
      messageArea.scrollTop = messageArea.scrollHeight -
        messageArea.clientHeight;
      input.value = '';
    }
  }

  const input = document.querySelector('textarea.message-input'),
    button = document.querySelector('button.send-message'),
    messageArea = document.getElementById('message-area');
  const answerGen = generateAnswer();

  button.addEventListener('click', sendMessage);
  input.addEventListener('keydown', event => {
    if (event.keyCode == 13) {
      event.preventDefault();
      sendMessage();
    }
  });
});