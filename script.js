document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.draggable-tile');
    let isDragging = false;
    let currentTile = null;
    let xOffset = 0, yOffset = 0;
    let initialX, initialY;

    tiles.forEach(tile => {
        tile.addEventListener('mousedown', dragStart);
        tile.addEventListener('mouseup', dragEnd);
        tile.addEventListener('mousemove', drag);
        tile.addEventListener('touchstart', touchStart);
        tile.addEventListener('touchend', touchEnd);
        tile.addEventListener('touchmove', touchDrag);
    });

    function dragStart(e) {
        e.preventDefault();
        isDragging = true;
        currentTile = e.target;
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    function dragEnd() {
        isDragging = false;
        currentTile = null;
    }

    function drag(e) {
        if (isDragging && currentTile) {
            e.preventDefault();
            const currentX = e.clientX - initialX;
            const currentY = e.clientY - initialY;
            updatePosition(currentX, currentY);
        }
    }

    function touchStart(e) {
        e.preventDefault();
        isDragging = true;
        currentTile = e.target;
        const touch = e.touches[0];
        initialX = touch.clientX - xOffset;
        initialY = touch.clientY - yOffset;
    }

    function touchEnd() {
        isDragging = false;
        currentTile = null;
    }

    function touchDrag(e) {
        if (isDragging && currentTile) {
            e.preventDefault();
            const touch = e.touches[0];
            const currentX = touch.clientX - initialX;
            const currentY = touch.clientY - initialY;
            updatePosition(currentX, currentY);
        }
    }

    function updatePosition(currentX, currentY) {
        const header = document.querySelector('.header');
        const headerRect = header.getBoundingClientRect();
        const tileRect = currentTile.getBoundingClientRect();

        const maxX = headerRect.width - tileRect.width;
        const maxY = headerRect.height - tileRect.height;

        xOffset = Math.min(Math.max(currentX, 0), maxX);
        yOffset = Math.min(Math.max(currentY, 0), maxY);

        currentTile.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    }
});
