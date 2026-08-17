import {defineConfig} from 'playwright';
export default defineConfig({testDir:'renderer',use:{headless:true,viewport:{width:1280,height:800}},webServer:{command:'npm run dev -- --host 127.0.0.1',url:'http://127.0.0.1:4173/renderer/',reuseExistingServer:false}});
