console.log('Script loaded');

async function fetchCount() {
  try {
    const response = await fetch(window.basePath + '/api/count');
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error fetching count:', error);
    return 0;
  }
}

async function incrementCount() {
  try {
    const response = await fetch(window.basePath + '/api/count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error incrementing count:', error);
    return null;
  }
}

async function decrementCount() {
  try {
    const response = await fetch(window.basePath + '/api/count/decrement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error decrementing count:', error);
    return null;
  }
}

async function resetCount() {
  try {
    const response = await fetch(window.basePath + '/api/count/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.count;
  } catch (error) {
    console.error('Error resetting count:', error);
    return null;
  }
}

function updateDisplay(count) {
  const display = document.getElementById('count-display');
  if (display) {
    display.textContent = count;
    display.classList.add('scale-110');
    setTimeout(() => display.classList.remove('scale-110'), 150);
  }
}

async function loadInitialCount() {
  const loading = document.getElementById('loading');
  if (loading) loading.classList.remove('hidden');
  
  const count = await fetchCount();
  updateDisplay(count);
  
  if (loading) loading.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing...');
  loadInitialCount();
  
  const incrementBtn = document.getElementById('increment-btn');
  const decrementBtn = document.getElementById('decrement-btn');
  const resetBtn = document.getElementById('reset-btn');
  
  console.log('Buttons found:', { incrementBtn, decrementBtn, resetBtn });
  
  if (incrementBtn) {
    incrementBtn.addEventListener('click', async () => {
      console.log('Increment button clicked');
      const newCount = await incrementCount();
      if (newCount !== null) {
        updateDisplay(newCount);
      }
    });
  }
  
  if (decrementBtn) {
    decrementBtn.addEventListener('click', async () => {
      console.log('Decrement button clicked');
      const newCount = await decrementCount();
      if (newCount !== null) {
        updateDisplay(newCount);
      }
    });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', async () => {
      console.log('Reset button clicked');
      const newCount = await resetCount();
      if (newCount !== null) {
        updateDisplay(newCount);
      }
    });
  }
});
