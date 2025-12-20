async function verify() {
    try {
        console.log('Fetching list...');
        const listRes = await fetch('http://localhost:5000/api/blog');
        const list = await listRes.json();
        console.log('List count:', list.length);
        console.log('First blog title:', list[0]?.title);

        console.log('Fetching detail...');
        const detailRes = await fetch('http://localhost:5000/api/blog/slug/website-development-cost-in-india');
        const detail = await detailRes.json();
        console.log('Detail title:', detail.title);
        console.log('Detail content length:', detail.content?.length);

        if (list.length > 0 && detail.title) {
            console.log('VERIFICATION SUCCESS');
        } else {
            console.log('VERIFICATION FAILED');
        }
    } catch (err) {
        console.error('Error:', err);
    }
}
verify();
