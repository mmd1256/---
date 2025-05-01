document.addEventListener('DOMContentLoaded', function() {
    // =====================
    // متغیرهای عمومی
    // =====================
    const pageLoader = document.getElementById('page-loader');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');
    const searchOverlay = document.getElementById('search-overlay');
    const searchToggle = document.getElementById('search-toggle');
    const closeSearch = document.getElementById('close-search');
    const searchInput = document.getElementById('search-input');
    const voiceSearch = document.getElementById('voice-search');
    const clearSearch = document.getElementById('clear-search');
    const filterToggle = document.getElementById('filter-toggle');
    const filtersSidebar = document.getElementById('filters-sidebar');
    const closeFilters = document.querySelector('.close-filters-btn');
    const sortToggle = document.getElementById('sort-toggle');
    const sortDropdownMenu = document.getElementById('sort-dropdown-menu');
    const sortOptions = document.querySelectorAll('.sort-option');
    const currentSort = document.getElementById('current-sort');
    const viewBtns = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');
    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeQuickView = document.getElementById('close-quick-view');
    const arModal = document.getElementById('ar-modal');
    const closeArModal = document.getElementById('close-ar-modal');
    const arViewBtns = document.querySelectorAll('.ar-view-btn');
    const filterGroups = document.querySelectorAll('.filter-group');
    const toggleFilterBtns = document.querySelectorAll('.toggle-filter');
    const sizeBtns = document.querySelectorAll('.size-btn');
    const colorBtns = document.querySelectorAll('.color-btn');
    const priceRangeBtns = document.querySelectorAll('.price-range-btn');
    const filterCheckboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    const applyFiltersBtn = document.querySelector('.apply-filters-btn');
    const resetFiltersBtn = document.querySelector('.reset-filters-btn');
    const clearAllFiltersBtn = document.getElementById('clear-all-filters');
    const activeFilterTags = document.getElementById('active-filter-tags');
    const aiFilterInput = document.getElementById('ai-filter-input');
    const aiSearchBtn = document.querySelector('.ai-search-btn');
    const paginationBtns = document.querySelectorAll('.pagination-number');
    const prevPageBtn = document.querySelector('.prev-btn');
    const nextPageBtn = document.querySelector('.next-btn');
    const productCards = document.querySelectorAll('.product-card');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    const removeItemBtns = document.querySelectorAll('.remove-item');
    const aiQuickAddBtns = document.querySelectorAll('.ai-quick-add');
    const compareItems = document.getElementById('compare-items');
    const compareBtns = document.querySelectorAll('.compare-btn');
    const addSuggestionBtns = document.querySelectorAll('.add-suggestion');
    const newsletterForm = document.querySelector('.newsletter-form');

    // =====================
    // لودر صفحه
    // =====================
    setTimeout(() => {
        pageLoader.style.opacity = '0';
        setTimeout(() => {
            pageLoader.style.display = 'none';
        }, 300);
        
        // انیمیشن ورود محتوا
        addClassWithDelay('.product-card', 'fade-in', 100);
    }, 1000);

    function addClassWithDelay(selector, className, delay) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add(className);
            }, delay * index);
        });
    }

    // =====================
    // منوی موبایل
    // =====================
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    });

    // =====================
    // سرچ اورلی
    // =====================
    searchToggle.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => {
            searchInput.focus();
        }, 300);
    });

    closeSearch.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
    });

    clearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
    });

    voiceSearch.addEventListener('click', () => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'fa-IR';
            
            recognition.onstart = () => {
                voiceSearch.innerHTML = '<i class="ri-mic-fill"></i>';
                voiceSearch.classList.add('recording');
            };
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                searchInput.value = transcript;
                searchProducts(transcript);
            };
            
            recognition.onend = () => {
                voiceSearch.innerHTML = '<i class="ri-mic-line"></i>';
                voiceSearch.classList.remove('recording');
            };
            
            recognition.start();
        } else {
            alert('متأسفانه مرورگر شما از جستجوی صوتی پشتیبانی نمی‌کند.');
        }
    });

    searchInput.addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });

    function searchProducts(query) {
        // این تابع می‌تواند با اتصال به API جستجو کامل شود
        console.log('Searching for:', query);
        
        if (query.length > 2) {
            // نمایش نتایج جستجو
            document.getElementById('search-suggestions').style.display = 'none';
            document.getElementById('search-results').style.display = 'block';
            // اینجا می‌توان نتایج جستجو را نمایش داد
        } else {
            document.getElementById('search-suggestions').style.display = 'block';
            document.getElementById('search-results').style.display = 'none';
        }
    }

    // =====================
    // فیلترها و مرتب‌سازی
    // =====================
    filterToggle.addEventListener('click', () => {
        filtersSidebar.classList.add('active');
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeFilters.addEventListener('click', () => {
        filtersSidebar.classList.remove('active');
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    });

    // باز/بسته کردن گروه‌های فیلتر
    toggleFilterBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const content = filterGroups[index].querySelector('.filter-content');
            const isActive = content.style.display === 'none';
            
            content.style.display = isActive ? 'block' : 'none';
            btn.querySelector('i').style.transform = isActive ? 'rotate(180deg)' : 'rotate(0)';
        });
    });

    // انتخاب مرتب‌سازی
    sortOptions.forEach(option => {
        option.addEventListener('click', () => {
            sortOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            const sortValue = option.textContent;
            currentSort.textContent = sortValue;
            
            sortProducts(option.dataset.sort);
        });
    });

    function sortProducts(sortType) {
        // این تابع می‌تواند با اتصال به API مرتب‌سازی کامل شود
        console.log('Sorting by:', sortType);
        
        // مثال ساده‌ای از مرتب‌سازی
        const products = Array.from(productsGrid.querySelectorAll('.product-card'));
        
        products.sort((a, b) => {
            if (sortType === 'price-low') {
                return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
            } else if (sortType === 'price-high') {
                return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
            } else if (sortType === 'newest') {
                // مثال ساده - در واقعیت می‌تواند بر اساس تاریخ باشد
                return 0; // تغییر ندادن ترتیب
            } else {
                return 0;
            }
        });
        
        // بازسازی DOM
        products.forEach(product => {
            productsGrid.appendChild(product);
        });
    }

    // تغییر نمای محصولات (گرید/لیست)
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const viewMode = btn.dataset.view;
            if (viewMode === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });

    // انتخاب سایز
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            updateActiveFilters();
        });
    });

    // انتخاب رنگ
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            updateActiveFilters();
        });
    });

    // انتخاب محدوده قیمت
    priceRangeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            priceRangeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            document.getElementById('price-min').value = numberWithCommas(btn.dataset.min);
            document.getElementById('price-max').value = numberWithCommas(btn.dataset.max);
            
            updateActiveFilters();
        });
    });

    // چک‌باکس‌های فیلتر
    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            updateActiveFilters();
        });
    });

    // به‌روزرسانی فیلترهای فعال
    function updateActiveFilters() {
        activeFilterTags.innerHTML = '';
        
        // فیلترهای دسته‌بندی
        const categoryFilters = document.querySelectorAll('input[name="category"]:checked');
        categoryFilters.forEach(filter => {
            addFilterTag('دسته: ' + filter.nextElementSibling.nextElementSibling.textContent, filter.value);
        });
        
        // فیلترهای برند
        const brandFilters = document.querySelectorAll('input[name="brand"]:checked');
        brandFilters.forEach(filter => {
            addFilterTag('برند: ' + filter.nextElementSibling.nextElementSibling.textContent, filter.value);
        });
        
        // فیلترهای ویژگی
        const featureFilters = document.querySelectorAll('input[name="feature"]:checked');
        featureFilters.forEach(filter => {
            addFilterTag('ویژگی: ' + filter.nextElementSibling.nextElementSibling.textContent, filter.value);
        });
        
        // فیلترهای سایز
        const sizeFilters = document.querySelectorAll('.size-btn.active');
        sizeFilters.forEach(filter => {
            addFilterTag('سایز: ' + filter.textContent, filter.dataset.size);
        });
        
        // فیلترهای رنگ
        const colorFilters = document.querySelectorAll('.color-btn.active');
        colorFilters.forEach(filter => {
            addFilterTag('رنگ: ' + filter.dataset.color, filter.dataset.color);
        });
        
        // فیلتر قیمت
        const minPrice = document.getElementById('price-min').value;
        const maxPrice = document.getElementById('price-max').value;
        if (minPrice && maxPrice) {
            addFilterTag(`قیمت: از ${minPrice} تا ${maxPrice}`, 'price');
        }
        
        // نمایش/مخفی کردن بخش فیلترهای فعال
        if (activeFilterTags.children.length > 0) {
            document.getElementById('active-filters').style.display = 'flex';
            clearAllFiltersBtn.style.display = 'block';
        } else {
            document.getElementById('active-filters').style.display = 'none';
            clearAllFiltersBtn.style.display = 'none';
        }
    }

    function addFilterTag(text, value) {
        const filterTag = document.createElement('div');
        filterTag.className = 'filter-tag';
        filterTag.dataset.value = value;
        filterTag.innerHTML = `
            ${text}
            <i class="ri-close-line" data-value="${value}"></i>
        `;
        
        filterTag.querySelector('i').addEventListener('click', (e) => {
            removeFilter(e.target.dataset.value);
        });
        
        activeFilterTags.appendChild(filterTag);
    }

    function removeFilter(value) {
        // حذف فیلتر دسته
        document.querySelectorAll(`input[name="category"][value="${value}"]`).forEach(el => {
            el.checked = false;
        });
        
        // حذف فیلتر برند
        document.querySelectorAll(`input[name="brand"][value="${value}"]`).forEach(el => {
            el.checked = false;
        });
        
        // حذف فیلتر ویژگی
        document.querySelectorAll(`input[name="feature"][value="${value}"]`).forEach(el => {
            el.checked = false;
        });
        
        // حذف فیلتر سایز
        document.querySelectorAll(`.size-btn[data-size="${value}"]`).forEach(el => {
            el.classList.remove('active');
        });
        
        // حذف فیلتر رنگ
        document.querySelectorAll(`.color-btn[data-color="${value}"]`).forEach(el => {
            el.classList.remove('active');
        });
        
        // حذف فیلتر قیمت
        if (value === 'price') {
            document.getElementById('price-min').value = '500,000';
            document.getElementById('price-max').value = '5,000,000';
        }
        
        updateActiveFilters();
    }

    // پاک کردن همه فیلترها
    clearAllFiltersBtn.addEventListener('click', () => {
        resetAllFilters();
    });

    resetFiltersBtn.addEventListener('click', () => {
        resetAllFilters();
    });

    function resetAllFilters() {
        // پاک کردن چک‌باکس‌ها
        filterCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // پاک کردن سایزها
        sizeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // پاک کردن رنگ‌ها
        colorBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // بازنشانی قیمت
        document.getElementById('price-min').value = '500,000';
        document.getElementById('price-max').value = '5,000,000';
        
        // بازنشانی محدوده قیمت
        priceRangeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // به‌روزرسانی فیلترهای فعال
        updateActiveFilters();
    }

    // اعمال فیلترها
    applyFiltersBtn.addEventListener('click', () => {
        // این تابع می‌تواند با اتصال به API فیلتر کامل شود
        console.log('Applying filters...');
        
        // بستن سایدبار فیلتر در موبایل
        filtersSidebar.classList.remove('active');
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
        
        // فیلتر کردن محصولات (مثال ساده)
        filterProducts();
    });

    function filterProducts() {
        // یک فیلتر ساده برای مثال
        productCards.forEach(card => {
            let visible = true;
            
            // فیلتر قیمت
            const priceMin = parseInt(document.getElementById('price-min').value.replace(/,/g, ''));
            const priceMax = parseInt(document.getElementById('price-max').value.replace(/,/g, ''));
            const productPrice = parseInt(card.dataset.price);
            
            if (productPrice < priceMin || productPrice > priceMax) {
                visible = false;
            }
            
            // نمایش/مخفی کردن محصول
            card.style.display = visible ? '' : 'none';
        });
        
        // به‌روزرسانی تعداد محصولات
        const visibleProducts = Array.from(productCards).filter(card => card.style.display !== 'none');
        document.getElementById('products-total').textContent = visibleProducts.length;
    }

    // فیلتر هوشمند AI
    aiSearchBtn.addEventListener('click', () => {
        const aiQuery = aiFilterInput.value.trim();
        if (aiQuery) {
            // این تابع می‌تواند با اتصال به API هوش مصنوعی کامل شود
            console.log('AI search for:', aiQuery);
            
            // مثال ساده:
            addFilterTag('جستجوی هوشمند: ' + aiQuery, 'ai-search');
            
            // بستن سایدبار فیلتر در موبایل
            filtersSidebar.classList.remove('active');
            modalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // =====================
    // صفحه‌بندی
    // =====================
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paginationBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // اینجا می‌توان صفحه جدید را بارگذاری کرد
        });
    });

    prevPageBtn.addEventListener('click', () => {
        const activePage = document.querySelector('.pagination-number.active');
        const prevPage = activePage.previousElementSibling;
        if (prevPage && prevPage.classList.contains('pagination-number')) {
            activePage.classList.remove('active');
            prevPage.classList.add('active');
            // اینجا می‌توان صفحه قبلی را بارگذاری کرد
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const activePage = document.querySelector('.pagination-number.active');
        const nextPage = activePage.nextElementSibling;
        if (nextPage && nextPage.classList.contains('pagination-number')) {
            activePage.classList.remove('active');
            nextPage.classList.add('active');
            // اینجا می‌توان صفحه بعدی را بارگذاری کرد
        }
    });

    // =====================
    // سبد خرید
    // =====================
    cartToggle.addEventListener('click', () => {
        cartDrawer.classList.add('active');
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeCart.addEventListener('click', () => {
        cartDrawer.classList.remove('active');
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    });

    continueShoppingBtn.addEventListener('click', () => {
        cartDrawer.classList.remove('active');
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    });

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            
            // انیمیشن افزودن به سبد خرید
            const productImage = productCard.querySelector('.product-image img');
            const cartIcon = document.querySelector('.cart-toggle');
            
            animateAddToCart(productImage, cartIcon);
            
            // افزودن محصول به سبد خرید
            // این بخش می‌تواند با اتصال به API سبد خرید کامل شود
            console.log('Added to cart:', productName);
            
            // نمایش سبد خرید
            setTimeout(() => {
                cartDrawer.classList.add('active');
                modalBackdrop.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 800);
        });
    });

    function animateAddToCart(productImage, cartIcon) {
        // ایجاد المان انیمیشن
        const flyingImage = document.createElement('img');
        flyingImage.src = productImage.src;
        flyingImage.style.position = 'fixed';
        flyingImage.style.zIndex = '1000';
        flyingImage.style.width = '100px';
        flyingImage.style.height = '100px';
        flyingImage.style.objectFit = 'cover';
        flyingImage.style.borderRadius = '50%';
        flyingImage.style.boxShadow = 'var(--shadow-md)';
        flyingImage.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        document.body.appendChild(flyingImage);
        
        // مختصات اولیه و نهایی
        const productRect = productImage.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();
        
        // تنظیم موقعیت اولیه
        flyingImage.style.top = `${productRect.top}px`;
        flyingImage.style.left = `${productRect.left}px`;
        flyingImage.style.width = `${productRect.width}px`;
        flyingImage.style.height = `${productRect.height}px`;
        flyingImage.style.opacity = '1';
        
        // اجرای انیمیشن با تأخیر کوتاه
        setTimeout(() => {
            flyingImage.style.top = `${cartRect.top}px`;
            flyingImage.style.left = `${cartRect.left}px`;
            flyingImage.style.width = '20px';
            flyingImage.style.height = '20px';
            flyingImage.style.opacity = '0';
            
            // اضافه کردن انیمیشن به آیکون سبد خرید
            cartIcon.classList.add('pulse');
            
            // به‌روزرسانی تعداد محصولات در سبد خرید
            setTimeout(() => {
                const cartCount = cartIcon.querySelector('.badge');
                cartCount.textContent = parseInt(cartCount.textContent) + 1;
                
                // حذف المان انیمیشن پس از اتمام
                flyingImage.remove();
                cartIcon.classList.remove('pulse');
            }, 800);
        }, 100);
    }

    // دکمه‌های علاقه‌مندی
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const isActive = btn.classList.contains('active');
            
            if (isActive) {
                btn.innerHTML = '<i class="ri-heart-fill"></i>';
                btn.style.backgroundColor = 'var(--accent)';
                btn.style.color = 'var(--light)';
            } else {
                btn.innerHTML = '<i class="ri-heart-line"></i>';
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }
        });
    });

    // تغییر تعداد محصول در سبد خرید
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.parentElement.querySelector('input');
            let value = parseInt(input.value);
            
            if (btn.classList.contains('plus') && value < 10) {
                input.value = value + 1;
            } else if (btn.classList.contains('minus') && value > 1) {
                input.value = value - 1;
            }
            
            // به‌روزرسانی قیمت (این بخش می‌تواند به‌روزرسانی کامل‌تری داشته باشد)
            updateCartTotal();
        });
    });

    // حذف محصول از سبد خرید
    removeItemBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cartItem = btn.closest('.cart-item');
            
            // انیمیشن حذف
            cartItem.style.transition = 'all 0.3s ease';
            cartItem.style.transform = 'translateX(-100%)';
            cartItem.style.opacity = '0';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartTotal();
                
                // به‌روزرسانی تعداد محصولات در سبد خرید
                const cartCount = document.querySelector('.cart-count');
                cartCount.textContent = parseInt(cartCount.textContent) - 1;
            }, 300);
        });
    });

    // به‌روزرسانی مجموع قیمت سبد خرید
    function updateCartTotal() {
        let total = 0;
        const cartItems = document.querySelectorAll('.cart-item');
        
        cartItems.forEach(item => {
            const price = parseInt(item.querySelector('.cart-item-price').textContent.replace(/[^0-9]/g, ''));
            const quantity = parseInt(item.querySelector('.item-quantity input').value);
            total += price * quantity;
        });
        
        // به‌روزرسانی مجموع قیمت
        const totalElements = document.querySelectorAll('.summary-row.total span:last-child');
        totalElements.forEach(el => {
            el.textContent = numberWithCommas(total) + ' تومان';
        });
    }

    // افزودن پیشنهاد به سبد خرید
    addSuggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const suggestionItem = btn.closest('.suggestion-item');
            const itemName = suggestionItem.querySelector('h5').textContent;
            
            // انیمیشن افزودن
            btn.textContent = '✓';
            btn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                btn.textContent = '+';
                btn.style.backgroundColor = '';
                
                // به‌روزرسانی تعداد محصولات در سبد خرید
                const cartCount = document.querySelector('.cart-count');
                cartCount.textContent = parseInt(cartCount.textContent) + 1;
                
                // به‌روزرسانی مجموع قیمت (این بخش می‌تواند به‌روزرسانی کامل‌تری داشته باشد)
                updateCartTotal();
            }, 1000);
            
            console.log('Added suggestion to cart:', itemName);
        });
    });

    // =====================
    // مودال‌ها
    // =====================
    // واقعیت افزوده
    arViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            arModal.classList.add('active');
            modalBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // شبیه‌سازی بارگذاری مدل سه‌بعدی
            const arViewer = document.getElementById('ar-viewer');
            const placeholder = arViewer.querySelector('.ar-placeholder');
            
            placeholder.innerHTML = '<div class="spinner"></div><span>در حال بارگذاری مدل سه‌بعدی...</span>';
            
            setTimeout(() => {
                // این بخش می‌تواند با بارگذاری واقعی مدل سه‌بعدی جایگزین شود
                placeholder.innerHTML = '<i class="ri-3d-cube-sphere-line"></i><span>مدل سه‌بعدی آماده است. دوربین خود را فعال کنید.</span>';
            }, 2000);
        });
    });

    closeArModal.addEventListener('click', () => {
        arModal.classList.remove('active');
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    });

    // پس‌زمینه مودال
    modalBackdrop.addEventListener('click', () => {
        // بستن همه مودال‌ها و اورلی‌ها
        mobileMenu.classList.remove('active');
        filtersSidebar.classList.remove('active');
        cartDrawer.classList.remove('active');
        quickViewModal.classList.remove('active');
        arModal.classList.remove('active');
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    });

    // مشاهده سریع محصول
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('.product-name a').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // نمایش اطلاعات محصول در مودال
            const quickViewContent = document.querySelector('.quick-view-content');
            
            // این بخش می‌تواند با بارگذاری واقعی اطلاعات محصول جایگزین شود
            quickViewContent.innerHTML = `
                <div class="quick-view-layout">
                    <div class="quick-view-gallery">
                        <img src="${productImage}" alt="${productName}">
                        <div class="gallery-thumbs">
                            <img src="${productImage}" alt="thumb1" class="active">
                            <img src="${productImage}" alt="thumb2">
                            <img src="${productImage}" alt="thumb3">
                        </div>
                    </div>
                    <div class="quick-view-details">
                        <h2>${productName}</h2>
                        <div class="product-rating">
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-fill"></i>
                            <i class="ri-star-half-line"></i>
                            <span>(124 نظر)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">${productPrice}</span>
                        </div>
                        <div class="product-colors">
                            <h3>رنگ‌ها:</h3>
                            <div class="colors-list">
                                <span class="color-dot" style="background-color: #000"></span>
                                <span class="color-dot" style="background-color: #1976d2"></span>
                                <span class="color-dot" style="background-color: #e53935"></span>
                            </div>
                        </div>
                        <div class="product-sizes">
                            <h3>سایزها:</h3>
                            <div class="sizes-list">
                                <button class="size-btn">40</button>
                                <button class="size-btn active">41</button>
                                <button class="size-btn">42</button>
                                <button class="size-btn">43</button>
                                <button class="size-btn">44</button>
                            </div>
                        </div>
                        <div class="product-description">
                            <p>توضیحات کوتاه محصول که می‌تواند شامل ویژگی‌های محصول، مواد به کار رفته و غیره باشد.</p>
                        </div>
                        <div class="product-actions">
                            <div class="quantity">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" value="1" min="1" max="10">
                                <button class="quantity-btn plus">+</button>
                            </div>
                            <button class="add-to-cart-btn">افزودن به سبد خرید</button>
                        </div>
                        <div class="extra-features">
                            <div class="feature">
                                <i class="ri-truck-line"></i>
                                <span>ارسال رایگان</span>
                            </div>
                            <div class="feature">
                                <i class="ri-refresh-line"></i>
                                <span>7 روز ضمانت بازگشت</span>
                            </div>
                            <div class="feature">
                                <i class="ri-secure-payment-line"></i>
                                <span>پرداخت امن</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // نمایش مودال
            quickViewModal.classList.add('active');
            modalBackdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeQuickView.addEventListener('click', () => {
        quickViewModal.classList.remove('active');
        modalBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    });

    // =====================
    // مقایسه محصولات
    // =====================
    compareBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productCard = btn.closest('.product-card');
            const productName = productCard.querySelector('.product-name a').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            
            // بررسی موجود بودن جای خالی در مقایسه
            const emptySlots = compareItems.querySelectorAll('.compare-item.empty');
            if (emptySlots.length > 0) {
                // پر کردن اولین جای خالی
                const slot = emptySlots[0];
                slot.classList.remove('empty');
                slot.innerHTML = `
                    <img src="${productImage}" alt="${productName}">
                    <div class="compare-item-remove">
                        <i class="ri-close-line"></i>
                    </div>
                `;
                
                // اضافه کردن دکمه حذف
                const removeBtn = slot.querySelector('.compare-item-remove');
                removeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    slot.classList.add('empty');
                    slot.innerHTML = `
                        <div class="compare-item-inner">
                            <i class="ri-add-line"></i>
                            <span>افزودن محصول</span>
                        </div>
                    `;
                    
                    // بررسی تعداد محصولات برای فعال/غیرفعال کردن دکمه مقایسه
                    updateCompareButton();
                });
                
                // بررسی تعداد محصولات برای فعال/غیرفعال کردن دکمه مقایسه
                updateCompareButton();
            } else {
                alert('حداکثر تعداد محصول برای مقایسه انتخاب شده است. لطفاً یکی را حذف کنید.');
            }
        });
    });

    // به‌روزرسانی دکمه مقایسه
    function updateCompareButton() {
        const compareBtn = document.querySelector('.compare-btn');
        const emptySlots = compareItems.querySelectorAll('.compare-item.empty');
        
        if (emptySlots.length < 3) {
            compareBtn.disabled = false;
        } else {
            compareBtn.disabled = true;
        }
    }

    // کلیک روی جای خالی مقایسه
    document.querySelectorAll('.compare-item.empty').forEach(slot => {
        slot.addEventListener('click', () => {
            // این بخش می‌تواند با نمایش مودال انتخاب محصول جایگزین شود
            alert('لطفاً از صفحه محصولات، دکمه مقایسه را برای محصول مورد نظر انتخاب کنید.');
        });
    });

    // =====================
    // عمومی
    // =====================
    // دکمه‌های اسکرول به بالا
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            // می‌توان یک دکمه اسکرول به بالا نمایش داد
        } else {
            // می‌توان دکمه اسکرول به بالا را مخفی کرد
        }
    });

    // فرم خبرنامه
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // ارسال به سرور (این بخش می‌تواند با ارسال واقعی به سرور جایگزین شود)
                console.log('Subscribed email:', email);
                
                // پیام موفقیت
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'ایمیل شما با موفقیت ثبت شد.';
                newsletterForm.appendChild(successMessage);
                
                // پاک کردن فرم
                emailInput.value = '';
                
                // حذف پیام پس از چند ثانیه
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            } else {
                // پیام خطا
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'لطفاً یک ایمیل معتبر وارد کنید.';
                newsletterForm.appendChild(errorMessage);
                
                // حذف پیام پس از چند ثانیه
                setTimeout(() => {
                    errorMessage.remove();
                }, 3000);
            }
        });
    }

    // =====================
    // توابع کمکی
    // =====================
    // اعتبارسنجی ایمیل
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // فرمت عدد با کاما
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // کلید اسکیپ برای بستن مودال‌ها
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // بستن همه مودال‌ها و اورلی‌ها
            mobileMenu.classList.remove('active');
            filtersSidebar.classList.remove('active');
            cartDrawer.classList.remove('active');
            searchOverlay.classList.remove('active');
            quickViewModal.classList.remove('active');
            arModal.classList.remove('active');
            modalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // بررسی تمامی المان‌ها
    function checkElements() {
        // بررسی وجود المان‌ها
        const elements = [
            pageLoader, mobileMenu, menuToggle, closeMenu, searchOverlay, searchToggle, closeSearch,
            searchInput, voiceSearch, clearSearch, filterToggle, filtersSidebar, closeFilters,
            cartToggle, cartDrawer, closeCart, modalBackdrop
        ];
        
        elements.forEach(el => {
            if (!el) {
                console.warn('Element not found:', el);
            }
        });
    }

    // بررسی المان‌ها فقط در حالت دیباگ
    if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        checkElements();
    }
});
 // لودینگ اسکلتی مدرن (ترند 2025)
 document.addEventListener('DOMContentLoaded', () => {
    // ایجاد استایل‌های لودینگ اسکلتی
    const skeletonStyle = document.createElement('style');
    skeletonStyle.textContent = `
      @keyframes skeletonPulse {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
  
      .skeleton-loader {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ffffff;
        z-index: 9999;
        overflow: auto;
        padding: 20px;
      }
  
      .skeleton-container {
        max-width: 1200px;
        margin: 0 auto;
      }
  
      .skeleton-element {
        background: linear-gradient(90deg, #f0f0f0 25%, #e6e6e6 50%, #f0f0f0 75%);
        background-size: 200% 100%;
        animation: skeletonPulse 1.5s ease-in-out infinite;
        border-radius: 8px;
        margin-bottom: 15px;
        position: relative;
        overflow: hidden;
      }
  
      .skeleton-element::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        animation: skeletonShimmer 2s infinite;
        transform: translateX(-100%);
      }
  
      @keyframes skeletonShimmer {
        100% {
          transform: translateX(100%);
        }
      }
  
      .skeleton-header {
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
      }
  
      .skeleton-logo {
        width: 120px;
        height: 40px;
        border-radius: 6px;
      }
  
      .skeleton-nav {
        display: flex;
        gap: 15px;
      }
  
      .skeleton-nav-item {
        width: 80px;
        height: 20px;
        border-radius: 4px;
      }
  
      .skeleton-actions {
        display: flex;
        gap: 15px;
      }
  
      .skeleton-action {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
  
      .skeleton-hero {
        height: 400px;
        border-radius: 16px;
        margin-bottom: 50px;
      }
  
      .skeleton-features {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-bottom: 50px;
      }
  
      .skeleton-feature {
        height: 120px;
        border-radius: 12px;
      }
  
      .skeleton-section-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
      }
  
      .skeleton-title {
        width: 200px;
        height: 30px;
        border-radius: 6px;
        margin-bottom: 15px;
      }
  
      .skeleton-subtitle {
        width: 300px;
        height: 20px;
        border-radius: 4px;
      }
  
      .skeleton-products {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        margin-bottom: 50px;
      }
  
      .skeleton-product {
        height: 350px;
        border-radius: 12px;
        display: flex;
        flex-direction: column;
      }
  
      .skeleton-product-image {
        height: 200px;
        border-radius: 12px 12px 0 0;
        margin-bottom: 15px;
      }
  
      .skeleton-product-info {
        padding: 0 15px;
      }
  
      .skeleton-product-title {
        height: 20px;
        width: 85%;
        border-radius: 4px;
        margin-bottom: 10px;
      }
  
      .skeleton-product-price {
        height: 25px;
        width: 120px;
        border-radius: 4px;
        margin-bottom: 15px;
      }
  
      .skeleton-product-button {
        height: 40px;
        border-radius: 8px;
      }
  
      .skeleton-special-offer {
        height: 250px;
        border-radius: 16px;
        margin-bottom: 50px;
      }
  
      @media (max-width: 992px) {
        .skeleton-features, .skeleton-products {
          grid-template-columns: repeat(2, 1fr);
        }
      }
  
      @media (max-width: 576px) {
        .skeleton-features, .skeleton-products {
          grid-template-columns: 1fr;
        }
        
        .skeleton-hero {
          height: 250px;
        }
      }
    `;
    document.head.appendChild(skeletonStyle);
  
    // ایجاد المان لودینگ
    const skeletonLoader = document.createElement('div');
    skeletonLoader.className = 'skeleton-loader';
    skeletonLoader.innerHTML = `
      <div class="skeleton-container">
        <!-- هدر -->
        <div class="skeleton-header">
          <div class="skeleton-logo skeleton-element"></div>
          <div class="skeleton-nav">
            <div class="skeleton-nav-item skeleton-element"></div>
            <div class="skeleton-nav-item skeleton-element"></div>
            <div class="skeleton-nav-item skeleton-element"></div>
            <div class="skeleton-nav-item skeleton-element"></div>
          </div>
          <div class="skeleton-actions">
            <div class="skeleton-action skeleton-element"></div>
            <div class="skeleton-action skeleton-element"></div>
            <div class="skeleton-action skeleton-element"></div>
          </div>
        </div>
  
        <!-- اسلایدر هیرو -->
        <div class="skeleton-hero skeleton-element"></div>
  
        <!-- ویژگی‌ها -->
        <div class="skeleton-features">
          <div class="skeleton-feature skeleton-element"></div>
          <div class="skeleton-feature skeleton-element"></div>
          <div class="skeleton-feature skeleton-element"></div>
          <div class="skeleton-feature skeleton-element"></div>
        </div>
  
        <!-- هدر بخش محصولات -->
        <div class="skeleton-section-header">
          <div class="skeleton-title skeleton-element"></div>
          <div class="skeleton-subtitle skeleton-element"></div>
        </div>
  
        <!-- محصولات -->
        <div class="skeleton-products">
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-element"></div>
            <div class="skeleton-product-info">
              <div class="skeleton-product-title skeleton-element"></div>
              <div class="skeleton-product-price skeleton-element"></div>
              <div class="skeleton-product-button skeleton-element"></div>
            </div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-element"></div>
            <div class="skeleton-product-info">
              <div class="skeleton-product-title skeleton-element"></div>
              <div class="skeleton-product-price skeleton-element"></div>
              <div class="skeleton-product-button skeleton-element"></div>
            </div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-element"></div>
            <div class="skeleton-product-info">
              <div class="skeleton-product-title skeleton-element"></div>
              <div class="skeleton-product-price skeleton-element"></div>
              <div class="skeleton-product-button skeleton-element"></div>
            </div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-element"></div>
            <div class="skeleton-product-info">
              <div class="skeleton-product-title skeleton-element"></div>
              <div class="skeleton-product-price skeleton-element"></div>
              <div class="skeleton-product-button skeleton-element"></div>
            </div>
          </div>
        </div>
  
        <!-- پیشنهاد ویژه -->
        <div class="skeleton-special-offer skeleton-element"></div>
  
        <!-- هدر بخش دوم -->
        <div class="skeleton-section-header">
          <div class="skeleton-title skeleton-element"></div>
          <div class="skeleton-subtitle skeleton-element"></div>
        </div>
  
        <!-- محصولات دوم -->
        <div class="skeleton-products">
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-element"></div>
            <div class="skeleton-product-info">
              <div class="skeleton-product-title skeleton-element"></div>
              <div class="skeleton-product-price skeleton-element"></div>
              <div class="skeleton-product-button skeleton-element"></div>
            </div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-element"></div>
            <div class="skeleton-product-info">
              <div class="skeleton-product-title skeleton-element"></div>
              <div class="skeleton-product-price skeleton-element"></div>
              <div class="skeleton-product-button skeleton-element"></div>
            </div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-element"></div>
            <div class="skeleton-product-info">
              <div class="skeleton-product-title skeleton-element"></div>
              <div class="skeleton-product-price skeleton-element"></div>
              <div class="skeleton-product-button skeleton-element"></div>
            </div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-element"></div>
            <div class="skeleton-product-info">
              <div class="skeleton-product-title skeleton-element"></div>
              <div class="skeleton-product-price skeleton-element"></div>
              <div class="skeleton-product-button skeleton-element"></div>
            </div>
          </div>
        </div>
      </div>
    `;
  
    // افزودن لودر به DOM
    document.body.prepend(skeletonLoader);
  
    // مخفی کردن محتوای اصلی تا پایان بارگذاری
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.opacity = '0';
    }
  
    // منتظر بارگیری همه منابع صفحه
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (mainContent) {
          mainContent.style.opacity = '1';
          mainContent.style.transition = 'opacity 0.5s ease';
        }
        
        // افزودن کلاس برای انیمیشن محو شدن
        skeletonLoader.style.opacity = '0';
        skeletonLoader.style.transition = 'opacity 0.5s ease';
        
        // حذف لودر پس از پایان انیمیشن
        setTimeout(() => {
          skeletonLoader.remove();
        }, 500);
      }, 1500); // زمان نمایش لودر (قابل تنظیم)
    });
  });
  // پیام خوش‌آمدگویی مدرن با رنگ آبی (ترند 2025)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      // ایجاد المان‌های مورد نیاز
      const welcomeContainer = document.createElement('div');
      welcomeContainer.className = 'welcome-modal';
      
      const modal = document.createElement('div');
      modal.className = 'welcome-content';
      
      // محتوای مودال
      modal.innerHTML = `
        <div class="welcome-header">
          <div class="welcome-logo">
            <div class="welcome-logo-glow"></div>
            <i class="ri-footprint-line"></i>
          </div>
          <h2 class="welcome-title">به <span class="gradient-text">امیریستور</span> خوش آمدید</h2>
          <p class="welcome-subtitle">تجربه‌ای جدید در خرید کفش</p>
        </div>
        <div class="welcome-body">
          <div class="welcome-feature">
            <i class="ri-shield-check-line"></i>
            <span>تضمین اصالت کالا</span>
          </div>
          <div class="welcome-feature">
            <i class="ri-truck-line"></i>
            <span>ارسال سریع</span>
          </div>
          <div class="welcome-feature">
            <i class="ri-customer-service-2-line"></i>
            <span>پشتیبانی 24/7</span>
          </div>
        </div>
        <div class="welcome-footer">
          <button class="welcome-btn">شروع خرید</button>
        </div>
      `;
      
      welcomeContainer.appendChild(modal);
      document.body.appendChild(welcomeContainer);
      
      // نمایش با انیمیشن
      requestAnimationFrame(() => {
        welcomeContainer.classList.add('visible');
        modal.classList.add('visible');
      });
      
      // دکمه بستن
      modal.querySelector('.welcome-btn').addEventListener('click', () => {
        welcomeContainer.classList.remove('visible');
        setTimeout(() => welcomeContainer.remove(), 500);
        localStorage.setItem('welcomeShown', 'true');
      });
      
      // اضافه کردن استایل‌ها
      const style = document.createElement('style');
      style.textContent = `
        .welcome-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .welcome-modal.visible {
          opacity: 1;
        }
        
        .welcome-content {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 24px;
          padding: 30px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          transform: translateY(30px) scale(0.95);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .welcome-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(20, 100, 255, 0.05), rgba(20, 170, 255, 0.05));
          z-index: -1;
        }
        
        .welcome-content.visible {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        
        .welcome-header {
          margin-bottom: 25px;
        }
        
        .welcome-logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #1464ff, #14aaff);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          position: relative;
        }
        
        .welcome-logo i {
          font-size: 40px;
          color: white;
        }
        
        .welcome-logo-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: inherit;
          filter: blur(20px);
          opacity: 0.7;
          z-index: -1;
          animation: pulse 2s infinite;
        }
        
        .welcome-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #1464ff, #14aaff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .welcome-subtitle {
          color: #666;
          font-size: 16px;
        }
        
        .welcome-body {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
        }
        
        .welcome-feature {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .welcome-feature i {
          font-size: 24px;
          color: #1464ff;
          margin-bottom: 8px;
        }
        
        .welcome-btn {
          background: linear-gradient(135deg, #1464ff, #14aaff);
          color: white;
          border: none;
          padding: 12px 35px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .welcome-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(20, 100, 255, 0.25);
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.7;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.7;
            transform: scale(0.95);
          }
        }
        
        @media (max-width: 600px) {
          .welcome-body {
            flex-direction: column;
            gap: 15px;
          }
          
          .welcome-feature {
            flex-direction: row;
            gap: 10px;
          }
        }
      `;
      
      document.head.appendChild(style);
    }, 1000);
  });
  // عملکرد سبد خرید
function initCartFunctionality() {
    // متغیرهای سبد خرید
    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const continueShopping = document.getElementById('continue-shopping');
    const cartItems = document.querySelector('.cart-items');
    const cartCountBadge = document.querySelector('.badge');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // دکمه‌های افزودن به سبد
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const addSuggestionButtons = document.querySelectorAll('.add-suggestion');
    const quickAddButtons = document.querySelectorAll('.ai-quick-add');
    
    // مقداردهی اولیه سبد خرید
    let cartItemCount = 0;
    updateCartBadge();
    
    // باز کردن و بستن سبد خرید
    if (cartToggle) {
        cartToggle.addEventListener('click', function() {
            openCartDrawer();
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            closeCartDrawer();
        });
    }
    
    if (continueShopping) {
        continueShopping.addEventListener('click', function() {
            closeCartDrawer();
        });
    }
    
    // دکمه‌های افزودن به سبد خرید
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            const productId = this.getAttribute('data-product-id') || '0';
            const productName = productCard.querySelector('.product-name a').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            addToCart(productName, productId, productImage, productPrice);
            
            // نمایش بازخورد
            showAddFeedback(button);
        });
    });
    
    // دکمه‌های افزودن پیشنهاد ویژه
    addSuggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const suggestionItem = this.closest('.suggestion-item');
            if (!suggestionItem) return;
            
            const productName = suggestionItem.querySelector('h5').textContent;
            const productImage = suggestionItem.querySelector('img').src;
            const productPrice = suggestionItem.querySelector('.suggestion-price').textContent;
            
            addToCart(productName, 'suggestion-' + Date.now(), productImage, productPrice);
            
            // نمایش بازخورد
            showAddFeedback(button);
        });
    });
    
    // دکمه‌های افزودن سریع
    if (quickAddButtons.length) {
        quickAddButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.ai-product-card');
                if (!productCard) return;
                
                const productName = productCard.querySelector('.ai-product-name').textContent;
                const productImage = productCard.querySelector('.ai-product-image img').src;
                const productPrice = productCard.querySelector('.ai-product-price').textContent;
                
                addToCart(productName, 'ai-' + Date.now(), productImage, productPrice);
                
                // نمایش بازخورد
                showAddFeedback(button, 'افزودن سریع');
            });
        });
    }
    
    // نمایش بازخورد افزودن محصول
    function showAddFeedback(button, originalText) {
        const btnText = originalText || button.innerHTML;
        button.classList.add('added');
        
        if (button.tagName === 'BUTTON') {
            button.innerHTML = '<i class="ri-check-line"></i><span>اضافه شد</span>';
        }
        
        setTimeout(() => {
            button.classList.remove('added');
            if (button.tagName === 'BUTTON') {
                button.innerHTML = btnText;
            }
        }, 2000);
    }
    
    // اضافه کردن محصول به سبد خرید
    function addToCart(productName, productId, productImage, productPrice) {
        // حذف پیام سبد خالی
        if (cartItems.querySelector('.empty-cart')) {
            cartItems.innerHTML = '';
        }
        
        // ایجاد المان محصول
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-product-id', productId);
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${productImage}" alt="${productName}">
            </div>
            <div class="cart-item-content">
                <div class="cart-item-top">
                    <h4 class="cart-item-name">${productName}</h4>
                    <button class="remove-item">
                        <i class="ri-delete-bin-6-line"></i>
                    </button>
                </div>
                <div class="cart-item-meta">
                    <span class="cart-item-variant">سایز: متوسط | رنگ: مشکی</span>
                </div>
                <div class="cart-item-bottom">
                    <div class="item-quantity">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="1" min="1" max="10">
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <div class="cart-item-price">${productPrice}</div>
                </div>
            </div>
        `;
        
        // افزودن به سبد خرید
        cartItems.appendChild(cartItem);
        
        // افزایش شمارنده
        cartItemCount++;
        updateCartBadge();
        
        // بروزرسانی قیمت‌ها
        updateCartTotals();
        
        // فعال‌سازی دکمه پرداخت
        checkoutBtn.removeAttribute('disabled');
        
        // نمایش سبد خرید
        openCartDrawer();
        
        // نمایش اعلان
        showNotification(`${productName} به سبد خرید اضافه شد`, 'success');
        
        // اضافه کردن رویدادها به دکمه‌های آیتم
        initCartItemEvents(cartItem);
    }
    
    // اضافه کردن رویدادها به آیتم‌های سبد خرید
    function initCartItemEvents(cartItem) {
        // دکمه حذف
        const removeButton = cartItem.querySelector('.remove-item');
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                cartItem.classList.add('removing');
                
                setTimeout(() => {
                    cartItem.remove();
                    cartItemCount--;
                    updateCartBadge();
                    updateCartTotals();
                    
                    // اگر سبد خالی شد
                    if (cartItemCount === 0) {
                        cartItems.innerHTML = '<div class="empty-cart">سبد خرید شما خالی است</div>';
                        checkoutBtn.setAttribute('disabled', 'disabled');
                    }
                    
                    showNotification('محصول از سبد خرید حذف شد', 'success');
                }, 300);
            });
        }
        
        // دکمه‌های تغییر تعداد
        const minusButton = cartItem.querySelector('.quantity-btn.minus');
        const plusButton = cartItem.querySelector('.quantity-btn.plus');
        const quantityInput = cartItem.querySelector('.item-quantity input');
        
        if (minusButton && quantityInput) {
            minusButton.addEventListener('click', function() {
                if (parseInt(quantityInput.value) > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                    updateCartTotals();
                }
            });
        }
        
        if (plusButton && quantityInput) {
            plusButton.addEventListener('click', function() {
                if (parseInt(quantityInput.value) < 10) {
                    quantityInput.value = parseInt(quantityInput.value) + 1;
                    updateCartTotals();
                }
            });
        }
        
        if (quantityInput) {
            quantityInput.addEventListener('change', function() {
                if (parseInt(this.value) < 1) {
                    this.value = 1;
                } else if (parseInt(this.value) > 10) {
                    this.value = 10;
                }
                updateCartTotals();
            });
        }
    }
    
    // بروزرسانی نشانگر تعداد سبد خرید
    function updateCartBadge() {
        if (cartCountBadge) {
            cartCountBadge.textContent = cartItemCount;
            
            if (cartItemCount > 0) {
                cartCountBadge.style.display = 'flex';
            } else {
                cartCountBadge.style.display = 'none';
            }
        }
    }
    
    // بروزرسانی قیمت‌های سبد خرید
    function updateCartTotals() {
        const cartItemElements = document.querySelectorAll('.cart-item');
        const totalPriceElement = document.querySelector('.summary-row:first-child span:last-child');
        const discountElement = document.querySelector('.discount-value');
        const finalPriceElement = document.querySelector('.summary-row.total span:last-child');
        
        if (!totalPriceElement || !finalPriceElement) return;
        
        // اگر سبد خالی است
        if (cartItemElements.length === 0) {
            totalPriceElement.textContent = '0 تومان';
            discountElement.textContent = '0 تومان';
            finalPriceElement.textContent = '0 تومان';
            return;
        }
        
        // محاسبه قیمت کل
        let totalPrice = 0;
        
        cartItemElements.forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent;
            const quantity = parseInt(item.querySelector('.item-quantity input').value);
            
            // استخراج عدد از متن قیمت
            const price = parseInt(priceText.replace(/[^\d]/g, ''));
            
            totalPrice += price * quantity;
        });
        
        // محاسبه تخفیف (برای مثال 10%)
        const discount = Math.round(totalPrice * 0.1);
        const finalPrice = totalPrice - discount;
        
        // بروزرسانی نمایش قیمت‌ها
        totalPriceElement.textContent = formatPrice(totalPrice) + ' تومان';
        discountElement.textContent = formatPrice(discount) + ' تومان';
        finalPriceElement.textContent = formatPrice(finalPrice) + ' تومان';
    }
    
    // فرمت‌دهی قیمت با جداکننده هزارگان
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // باز کردن سبد خرید
    function openCartDrawer() {
        if (cartDrawer) {
            cartDrawer.classList.add('open');
            document.body.classList.add('no-scroll');
            document.getElementById('modal-backdrop').classList.add('active');
        }
    }
    
    // بستن سبد خرید
    function closeCartDrawer() {
        if (cartDrawer) {
            cartDrawer.classList.remove('open');
            document.body.classList.remove('no-scroll');
            document.getElementById('modal-backdrop').classList.remove('active');
        }
    }
    
    // نمایش اعلان
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        notification.innerHTML = `
            <i class="ri-${type === 'success' ? 'check-line' : type === 'error' ? 'error-warning-line' : 'information-line'}"></i>
            <p>${message}</p>
            <button class="notification-close"><i class="ri-close-line"></i></button>
        `;
        
        // افزودن به صفحه
        document.body.appendChild(notification);
        
        // نمایش با تأخیر
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // مخفی کردن پس از مدتی
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // دکمه بستن
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        }
    }
}

// فراخوانی تابع راه‌اندازی سبد خرید
document.addEventListener('DOMContentLoaded', initCartFunctionality);