document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.draggable-tile');
    let isDragging = false;
    let currentTile = null;
    let initialX, initialY, xOffset = 0, yOffset = 0;

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
        const rect = currentTile.getBoundingClientRect();
        initialX = (e.clientX || e.touches[0].clientX) - rect.left;
        initialY = (e.clientY || e.touches[0].clientY) - rect.top;
        currentTile.style.cursor = 'grabbing';
    }

    function dragEnd() {
        isDragging = false;
        if (currentTile) currentTile.style.cursor = 'grab';
        currentTile = null;
    }

    function drag(e) {
        if (isDragging && currentTile) {
            e.preventDefault();
            const clientX = e.clientX || e.touches[0].clientX;
            const clientY = e.clientY || e.touches[0].clientY;
            const newX = clientX - initialX;
            const newY = clientY - initialY;
            
            const header = document.querySelector('.header');
            const headerRect = header.getBoundingClientRect();
            const tileRect = currentTile.getBoundingClientRect();

            const maxX = headerRect.width - tileRect.width;
            const maxY = headerRect.height - tileRect.height;

            xOffset = Math.min(Math.max(newX, 0), maxX);
            yOffset = Math.min(Math.max(newY, 0), maxY);

            currentTile.style.left = `${xOffset}px`;
            currentTile.style.top = `${yOffset}px`;
        }
    }

    function touchStart(e) {
        dragStart(e.touches[0]);
    }

    function touchEnd() {
        dragEnd();
    }

    function touchDrag(e) {
        drag(e.touches[0]);
    }
});
