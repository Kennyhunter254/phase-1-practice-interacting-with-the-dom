document.addEventListener('DOMContentLoaded', function() {
    const counterDisplay = document.getElementById('counter');
    const plusButton = document.getElementById('plus');
    const minusButton = document.getElementById('minus');
    const likeButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('list');
    const likesList = document.querySelector('.likes');
  
    let count = 0;
    let intervalId;
    let isPaused = false;
  
    // Function to increment the counter
    function incrementCounter() {
      count++;
      counterDisplay.textContent = count;
    }
  
    // Function to decrement the counter
    function decrementCounter() {
      count--;
      counterDisplay.textContent = count;
    }
  
    // Function to like the current count
    function likeCounter() {
      const existingLike = likesList.querySelector(`li[data-count="${count}"]`);
      if (existingLike) {
        const likeCount = parseInt(existingLike.dataset.likes) + 1;
        existingLike.dataset.likes = likeCount;
        existingLike.textContent = `${count} has been liked ${likeCount} time${likeCount !== 1 ? 's' : ''}`;
      } else {
        const newLike = document.createElement('li');
        newLike.dataset.count = count;
        newLike.dataset.likes = 1;
        newLike.textContent = `${count} has been liked 1 time`;
        likesList.appendChild(newLike);
      }
    }
  
    // Function to pause or resume the counter
    function togglePause() {
      if (!isPaused) {
        isPaused = true;
        clearInterval(intervalId);
        pauseButton.textContent = 'resume';
        plusButton.disabled = true;
        minusButton.disabled = true;
        likeButton.disabled = true;
        commentInput.disabled = true;
        commentForm.querySelector('button[type="submit"]').disabled = true;
      } else {
        isPaused = false;
        intervalId = setInterval(incrementCounter, 1000);
        pauseButton.textContent = 'pause';
        plusButton.disabled = false;
        minusButton.disabled = false;
        likeButton.disabled = false;
        commentInput.disabled = false;
        commentForm.querySelector('button[type="submit"]').disabled = false;
      }
    }
  
    // Function to handle comment submission
    function submitComment(event) {
      event.preventDefault();
      const commentText = commentInput.value.trim();
      if (commentText !== '') {
        const commentItem = document.createElement('div');
        commentItem.textContent = commentText;
        commentsList.appendChild(commentItem);
        commentInput.value = '';
      }
    }
  
    // Event listeners
    plusButton.addEventListener('click', incrementCounter);
    minusButton.addEventListener('click', decrementCounter);
    likeButton.addEventListener('click', likeCounter);
    pauseButton.addEventListener('click', togglePause);
    commentForm.addEventListener('submit', submitComment);
  
    // Start the counter initially
    intervalId = setInterval(incrementCounter, 1000);
  });
  