document.addEventListener('DOMContentLoaded', function() {
    // タブ切り替え機能
    const yearTabs = document.querySelectorAll('.year-tab');
    const yearContents = document.querySelectorAll('.year-content');

    yearTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 現在のタブとコンテンツのactiveクラスを削除
            yearTabs.forEach(t => t.classList.remove('active'));
            yearContents.forEach(c => c.classList.remove('active'));

            // クリックされたタブと対応するコンテンツにactiveクラスを追加
            this.classList.add('active');
            const year = this.dataset.year;
            const content = document.querySelector(`.year-content[data-year="${year}"]`);
            if (content) {
                content.classList.add('active');
            }

            // スクロール位置を調整
            window.scrollTo({
                top: document.querySelector('.gallery').offsetTop - document.querySelector('header').offsetHeight - 20,
                behavior: 'smooth'
            });
        });
    });
    // セクションリンクのスクロール位置調整
    const sectionLinks = document.querySelectorAll('.section-link');
    sectionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // ヘッダーの高さを取得
            const headerHeight = document.querySelector('header').offsetHeight;
            
            // スクロール位置を調整
            window.scrollTo({
                top: targetSection.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });

            // 現在のセクションのリンクにactiveクラスを追加
            sectionLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // スクロール時に現在のセクションを追跡
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const headerHeight = document.querySelector('header').offsetHeight;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= headerHeight && rect.bottom >= headerHeight) {
                const targetLink = document.querySelector(`a[href="#${section.id}"]`);
                if (targetLink) {
                    sectionLinks.forEach(l => l.classList.remove('active'));
                    targetLink.classList.add('active');
                }
            }
        });
    });

    // イラストカードのローディング効果
    const galleryItems = document.querySelectorAll('.gallery-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);

        // イラストカードのクリックイベント
        item.addEventListener('click', function() {
            const modalOverlay = document.querySelector('.modal-overlay');
            const modalContent = document.querySelector('.modal-content');
            const modalImage = document.querySelector('.modal-image');
            const modalTitle = modalContent.querySelector('h3');
            const modalAuthor = modalContent.querySelector('.author-info .author-link');
            const modalDate = modalContent.querySelector('.date');

            // イラストと情報を取得
            const img = item.querySelector('img');
            const title = item.querySelector('.gallery-item-info .item-header h3').textContent;
            const author = item.querySelector('.gallery-item-info .item-header .author-link').textContent;
            const authorLink = item.querySelector('.gallery-item-info .item-header .author-link').href;
            const date = item.querySelector('.gallery-item-info p').textContent;

            // モーダルのコンテンツを更新
            modalImage.src = img.src;
            modalImage.alt = title;
            modalTitle.textContent = title;
            modalAuthor.textContent = author;
            modalAuthor.href = authorLink;
            modalAuthor.target = '_blank';
            modalAuthor.rel = 'noopener noreferrer';
            modalDate.textContent = date;

            // モーダルを表示
            modalOverlay.classList.add('active');

            // クローズボタンのクリックイベント
            const closeBtn = document.querySelector('.modal-close');
            closeBtn.onclick = function() {
                modalOverlay.classList.remove('active');
            };

            // オーバーレイのクリックイベント
            modalOverlay.onclick = function(event) {
                if (event.target === modalOverlay) {
                    modalOverlay.classList.remove('active');
                }
            };

            // キーボードイベント（ESCキーで閉じる）
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape') {
                    modalOverlay.classList.remove('active');
                }
            });
        });
    });

    // ドキュメント全体のクリックイベントを追加
    document.addEventListener('click', function(e) {
        const target = e.target;
        const activeCard = document.querySelector('.gallery-item.active');
        const overlay = document.querySelector('.overlay');

        // カードやオーバーレイをクリックしていない場合、元に戻る
        if (activeCard && !target.closest('.gallery-item') && !target.closest('.overlay')) {
            activeCard.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});
