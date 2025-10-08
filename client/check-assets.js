// Asset verification script
import fs from 'fs';
import path from 'path';

const assetsInCode = [
    'logo.svg',
    'logo_icon.svg', 
    'arrow_icon.svg',
    'header_img.png',
    'remove_bg_icon.svg',
    'upload_icon.svg',
    'download_icon.svg',
    'image_w_bg.png',
    'image_wo_bg.png',
    'facebook_icon.svg',
    'google_plus_icon.svg',
    'twitter_icon.svg',
    'upload_btn_icon.svg',
    'credit_icon.png',
    'profile_img_1.png',
    'profile_img_2.png',
    'bg_layer.png'
];

const publicAssetsDir = './public/assets';

console.log('🔍 Checking if all required assets exist in public/assets...\n');

let allAssetsExist = true;

assetsInCode.forEach(asset => {
    const assetPath = path.join(publicAssetsDir, asset);
    if (fs.existsSync(assetPath)) {
        console.log(`✅ ${asset}`);
    } else {
        console.log(`❌ ${asset} - MISSING!`);
        allAssetsExist = false;
    }
});

if (allAssetsExist) {
    console.log('\n🎉 All assets are properly set up for production!');
} else {
    console.log('\n⚠️ Some assets are missing. Please check the missing files.');
}