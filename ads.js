const showNontonButton = () => {
    const btn = document.getElementById('btn-nonton-app');
    if (btn) {
        btn.classList.remove('hidden');
        btn.style.display = 'flex';
    }
};

const showPopupAd = () => {
    const popup = document.getElementById('popup-ads-container');
    const adsPlaceholder = document.getElementById('ads-placeholder');

    if (popup && adsPlaceholder) {
        popup.classList.remove('hidden');
        popup.style.display = 'flex';

        window.atOptions = {
            'key' : 'c6519a79b77606d968cf36c00f3894c6',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
        };

        const adScript = document.createElement('script');
        adScript.type = 'text/javascript';
        adScript.src = 'https://www.highperformanceformat.com/c6519a79b77606d968cf36c00f3894c6/invoke.js?t=' + Date.now();
        
        adsPlaceholder.innerHTML = ''; 
        adsPlaceholder.appendChild(adScript);
    }
};

const closePopupAd = () => {
    const popup = document.getElementById('popup-ads-container');
    if (popup) {
        popup.style.display = 'none';
        direct();
    }
};

const refreshAds = (type) => {
    const isMobile = window.innerWidth < 768;

    const bannerConfig = isMobile ? {
        key: 'c4fbe3d24e0cfbdf0a7cda042ea7369f',
        format: 'iframe', height: 50, width: 320
    } : {
        key: 'e0fd887cf9a21321f0285f683533be30',
        format: 'iframe', height: 90, width: 728
    };

    const rectConfig = {
        key: 'c6519a79b77606d968cf36c00f3894c6',
        format: 'iframe', height: 250, width: 300
    };
	
	const tiktokConfig = {
        key: 'c4fbe3d24e0cfbdf0a7cda042ea7369f',
        format: 'iframe',
        height: 50,
        width: 320
    };

    const injectAdIsolated = (targetId, containerId, config) => {
        const target = document.getElementById(targetId);
        const container = document.getElementById(containerId);
        if (!target || !container) return;

        container.style.display = 'flex';
        container.classList.remove('hidden');

        target.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.width = config.width;
        iframe.height = config.height;
        iframe.frameBorder = "0";
        iframe.scrolling = "no";
        target.appendChild(iframe);

        const iframeDoc = iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(`
            <body style="margin:0;padding:0;display:flex;justify-content:center;">
                <script type="text/javascript">var atOptions = ${JSON.stringify(config)};</script>
                <script type="text/javascript" src="https://www.highperformanceformat.com/${config.key}/invoke.js"></script>
            </body>
        `);
        iframeDoc.close();
    };

    if (type === 'tiktok_view') {
        injectAdIsolated('ads-tiktok-top', 'container-ads-tiktok-top', tiktokConfig);
    } else {
        injectAdIsolated('ads-728x90', 'container-ads-728x90', bannerConfig);
        setTimeout(() => {
            injectAdIsolated('ads-320x250', 'container-ads-320x250', rectConfig);
        }, 200);
    }
};

const direct = () => {
    //document.body.onclick = function() {
    //    window.open('https://www.effectivegatecpm.com/duvu4mhj?key=e2aac116fbcba2916a52a211c0018869', '_blank');
    //    document.body.onclick = null; 
    //};
};

window.addEventListener('load', () => {
    setTimeout(showNontonButton, 3000);
    refreshAds('initial');
    direct();
});
