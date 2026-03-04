document.addEventListener('DOMContentLoaded', () => {

    const copyLinkBtn = document.getElementById('copyLinkBtn');

    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', async () => {
            const url = window.location.href;

            try {
                if (navigator.clipboard) {
                    await navigator.clipboard.writeText(url);
                    showToast('Link kopyalandı');
                } else {
                    fallbackCopy(url);
                }
            } catch (err) {
                fallbackCopy(url);
            }
        });
    }

    function fallbackCopy(text) {
        prompt('Link:', text);
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);

        void toast.offsetWidth;

        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
});
