document.addEventListener('DOMContentLoaded', function() {
    // タブ切り替え機能
    const yearTabs = document.querySelectorAll('.year-tab');
    const yearContents = document.querySelectorAll('.year-content');

    // タイルの生成
    const tilesContainer = document.querySelector('.tiles-container');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (tilesContainer && galleryItems.length > 0) {
        galleryItems.forEach(galleryItem => {
            const img = galleryItem.querySelector('img');
            const title = galleryItem.querySelector('.gallery-item-info h3').textContent;

            if (img && title) {
                // タイルの作成
                const tile = document.createElement('div');
                tile.className = 'tile';
                
                // 画像の作成
                const imgElement = document.createElement('img');
                imgElement.src = img.src;
                imgElement.alt = title;
                
                // オーバーレイの作成
                const overlay = document.createElement('div');
                overlay.className = 'tile-overlay';
                
                // タイトルの作成
                const titleElement = document.createElement('div');
                titleElement.className = 'tile-title';
                titleElement.textContent = title;

                // DOMツリーの構築
                overlay.appendChild(titleElement);
                tile.appendChild(imgElement);
                tile.appendChild(overlay);
                tilesContainer.appendChild(tile);

                // クリックイベントの追加
                tile.addEventListener('click', function() {
                    // イメージのパスを取得
                    const imagePath = img.src.split('/').pop();
                    
                    // クリックされたタイルに対応するイラストカードを取得
                    const targetGalleryItem = Array.from(document.querySelectorAll('.gallery-item')).find(item => {
                        const galleryImg = item.querySelector('img');
                        return galleryImg && galleryImg.src.split('/').pop() === imagePath;
                    });

                    if (targetGalleryItem) {
                        // イラストカードが属する年タブを取得
                        const targetYearTab = targetGalleryItem.closest('.year-content').dataset.year;
                        const yearTab = document.querySelector(`.year-tab[data-year="${targetYearTab}"]`);

                        // タブをアクティブに
                        document.querySelectorAll('.year-tab').forEach(tab => tab.classList.remove('active'));
                        document.querySelectorAll('.year-content').forEach(content => content.classList.remove('active'));
                        yearTab.classList.add('active');
                        document.querySelector(`.year-content[data-year="${targetYearTab}"]`).classList.add('active');

                        // ギャラリーセクションまでスクロール
                        window.scrollTo({
                            top: document.querySelector('.gallery').offsetTop - document.querySelector('header').offsetHeight - 20,
                            behavior: 'smooth'
                        });

                        // イラストカードの位置までスクロール
                        setTimeout(() => {
                            targetGalleryItem.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }, 500);
                    }
                });
            }
        });
    }

<<<<<<< HEAD
    // タブ切り替え機能のイベントリスナー
=======
>>>>>>> origin/main
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
<<<<<<< HEAD
            scrollToGallery();
        });
    });

=======
            window.scrollTo({
                top: document.querySelector('.gallery').offsetTop - document.querySelector('header').offsetHeight - 20,
                behavior: 'smooth'
            });
        });
    });
>>>>>>> origin/main
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
