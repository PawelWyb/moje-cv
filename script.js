document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.draggable-tile');
    let isDragging = false;
    let currentTile = null;
    let initialX, initialY, xOffset = 0, yOffset = 0;

    tiles.forEach(tile => {
        tile.addEventListener('mousedown', dragStart);
        tile.addEventListener('mouseup', dragEnd);
        tile.addEventListener('mousemove', drag);
    });

    function dragStart(e) {
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
            
            // Ograniczenie ruchu do obszaru nagłówka
            const header = document.querySelector('.header');
            const headerRect = header.getBoundingClientRect();
            
            const maxX = headerRect.width - currentTile.offsetWidth;
            const maxY = headerRect.height - currentTile.offsetHeight;
            
            xOffset = Math.min(Math.max(currentX, 0), maxX);
            yOffset = Math.min(Math.max(currentY, 0), maxY);

            currentTile.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        }
    }
});