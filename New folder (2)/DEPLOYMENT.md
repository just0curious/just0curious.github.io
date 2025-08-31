# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your People Manager application to GitHub Pages with the URL structure you want: `just0curious.github.io/New folder (2)/`

## 📋 Prerequisites

- GitHub account
- Git installed on your computer
- Basic knowledge of Git commands

## 🎯 Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository name: `just0curious.github.io` (exactly this name)
4. Make it **Public**
5. Don't initialize with README (we'll upload our files)
6. Click "Create repository"

### Step 2: Prepare Your Files

Your project is already prepared with the correct structure:

```
root/           ← This folder contains your GitHub Pages files
├── index.html
└── script.js
```

### Step 3: Upload Files to GitHub

#### Option A: Using Git (Recommended)

```bash
# Clone the repository
git clone https://github.com/just0curious/just0curious.github.io.git
cd just0curious.github.io

# Copy your files
cp -r ../"New folder (2)/root"/* .

# Add and commit files
git add .
git commit -m "Initial commit: People Manager app"
git push origin main
```

#### Option B: Using GitHub Web Interface

1. In your repository, click "Add file" → "Upload files"
2. Drag and drop the contents of the `root/` folder
3. Click "Commit changes"

### Step 4: Enable GitHub Pages

1. Go to your repository Settings
2. Click "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Branch: `main`
5. Folder: `/ (root)`
6. Click "Save"

### Step 5: Wait for Deployment

- GitHub will build and deploy your site
- This usually takes 2-5 minutes
- You'll see a green checkmark when it's ready

### Step 6: Access Your Site

Your site will be available at:
```
https://just0curious.github.io/New folder (2)/
```

## 🔧 Configuration Options

### Demo Mode (Default)
- ✅ Works immediately after deployment
- ✅ Uses browser local storage
- ✅ No backend required
- ✅ Perfect for demos and portfolios

### Production Mode
To connect to a real backend:

1. Deploy your FastAPI backend to a cloud platform
2. Update `config.js`:
```javascript
DEMO_MODE: false,
API_BASE: 'https://your-backend-url.com'
```

## 🚨 Troubleshooting

### Common Issues

**Issue**: Site shows 404 error
**Solution**: Ensure all files are in the root of the repository, not in a subfolder

**Issue**: JavaScript doesn't work
**Solution**: Check browser console for errors. Make sure all file paths are correct

**Issue**: Site takes too long to load
**Solution**: GitHub Pages can take up to 10 minutes for the first deployment

### File Structure Check

Your repository should look like this:
```
just0curious.github.io/
├── index.html
├── script.js
├── config.js
└── .nojekyll
```

## 🎉 Success!

Once deployed, your People Manager app will:
- ✅ Work on GitHub Pages
- ✅ Have the URL structure you wanted
- ✅ Function in demo mode with local storage
- ✅ Be accessible from anywhere
- ✅ Work on mobile and desktop

## 🔄 Updates

To update your site:
1. Make changes to your local files
2. Push to GitHub: `git push origin main`
3. GitHub Pages will automatically redeploy

## 📱 Testing

Test your deployed site:
- [ ] Homepage loads correctly
- [ ] Add person form works
- [ ] Search functionality works
- [ ] Delete functionality works
- [ ] Mobile responsive design

## 🆘 Need Help?

If you encounter issues:
1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Verify your repository settings
3. Check the Actions tab for deployment logs
4. Ensure all files are in the correct location

---

**🎯 Your goal**: `just0curious.github.io/New folder (2)/` ✅

**🚀 Status**: Ready for deployment!
