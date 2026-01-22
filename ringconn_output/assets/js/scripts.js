
document.addEventListener('DOMContentLoaded', function() {
    // Accordion/Toggle
    document.querySelectorAll('[data-toggle], .accordion-header, [data-accordion]').forEach(el => {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function(e) {
            e.preventDefault();
            const next = this.nextElementSibling;
            if (next) {
                next.classList.toggle('show');
                this.classList.toggle('active');
            }
        });
    });
    
    // Table hover
    document.querySelectorAll('table tr').forEach(row => {
        row.onmouseenter = () => row.style.backgroundColor = 'rgba(0,123,255,0.08)';
        row.onmouseleave = () => row.style.backgroundColor = '';
    });
    
    // Tabs
    document.querySelectorAll('[role="tab"]').forEach(tab => {
        tab.onclick = function(e) {
            e.preventDefault();
            const list = this.closest('[role="tablist"]');
            if (list) list.querySelectorAll('[role="tab"]').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const target = this.getAttribute('aria-controls');
            if (target) {
                document.querySelectorAll('[role="tabpanel"]').forEach(p => p.hidden = true);
                const panel = document.getElementById(target);
                if (panel) panel.hidden = false;
            }
        };
    });
    
    // Fix broken images
    document.querySelectorAll('img').forEach(img => {
        img.onerror = () => img.style.display = 'none';
    });
    
    console.log('✅ 脚本已加载');
});
