function scrollToEnd() {
            const container = document.getElementById('input');
            if (container) {
                if(container.scrollWidth > container.clientWidth){
                    // scrollWidth is the total width of the content, including overflow
                    // Setting scrollLeft to scrollWidth moves it to the very end
                    container.scrollLeft = container.scrollWidth;
                    //console.log('Scrolled to end. scrollLeft:', container.scrollLeft, 'scrollWidth:', container.scrollWidth);
                }
            }
        }

        function scrollToStart() {
            const container = document.getElementById('input');
            if (container) {
                // Setting scrollLeft to 0 moves it to the very beginning
                container.scrollLeft = 0;
                console.log('Scrolled to start. scrollLeft:', container.scrollLeft);
            }
        }

        function scrollByAmount(amount) {
            const container = document.getElementById('input');
            if (container) {
                // Adds the amount to the current scroll position
                container.scrollLeft += amount;
                console.log('Scrolled by', amount, 'px. New scrollLeft:', container.scrollLeft);
            }
        }