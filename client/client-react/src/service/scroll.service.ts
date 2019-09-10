export function scrollToggle() {
  return {
    hide() {
      (document.querySelector('body') as HTMLBodyElement).style.overflowY = 'hidden';
    },
    visible() {
      (document.querySelector('body') as HTMLBodyElement).style.overflowY = 'visible';
    }
  }
}