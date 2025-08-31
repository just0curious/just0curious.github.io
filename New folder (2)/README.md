# People Manager - GitHub Pages Deployment

A simple people profile management system that can be deployed to GitHub Pages.

## 🌐 Live Demo

This application is designed to work on GitHub Pages at: `just0curious.github.io/New folder (2)/`

## 🚀 Features

- ✅ Add new people profiles
- ✅ Search people by name, skills, description, or location
- ✅ View all people in a list
- ✅ Delete people profiles
- ✅ Responsive design
- ✅ Works offline (local storage)

## 📁 Project Structure

```
├── root/                 # Static files for GitHub Pages
│   ├── index.html       # Main application page
│   └── script.js        # Application logic
├── app/                  # FastAPI backend (for local development)
│   ├── main.py          # FastAPI application
│   ├── models.py        # Database models
│   ├── schemas.py       # Pydantic schemas
│   ├── crud.py          # Database operations
│   └── database.py      # Database configuration
├── requirements.txt      # Python dependencies
└── README.md            # This file
```

## 🎯 Deployment Options

### Option 1: GitHub Pages (Current Setup)
- **Pros**: Free, easy to set up, works with your desired URL structure
- **Cons**: Frontend only, no backend API
- **Best for**: Demo, portfolio, static applications

### Option 2: Full Stack Deployment
- **Platforms**: Railway, Render, Heroku, DigitalOcean
- **Pros**: Full functionality with database
- **Cons**: Different URL structure, may have costs
- **Best for**: Production applications

## 🚀 Deploy to GitHub Pages

### Step 1: Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it: `just0curious.github.io` (for your username)
3. Make it public

### Step 2: Upload Files
1. Upload the `root/` folder contents to your repository
2. Or use Git commands:
```bash
git clone https://github.com/just0curious/just0curious.github.io.git
cd just0curious.github.io
# Copy root/ folder contents here
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 3: Enable GitHub Pages
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Click Save

### Step 4: Access Your Site
Your site will be available at: `https://just0curious.github.io/New folder (2)/`

## 🔧 Configuration

### Demo Mode vs Production Mode
The application has two modes:

1. **Demo Mode** (Default): Uses browser local storage
   - Set `DEMO_MODE = true` in `script.js`
   - Works offline
   - Data persists in browser

2. **Production Mode**: Connects to backend API
   - Set `DEMO_MODE = false` in `script.js`
   - Update `API_BASE` to your deployed backend URL
   - Full database functionality

### Switching to Production Mode
1. Deploy your FastAPI backend to a cloud platform
2. Update `script.js`:
```javascript
const DEMO_MODE = false;
const API_BASE = 'https://your-api-url.com';
```

## 🛠️ Local Development

### Frontend Only (GitHub Pages compatible)
```bash
# Serve static files
cd root
python -m http.server 8000
# Open http://localhost:8000
```

### Full Stack (with FastAPI backend)
```bash
# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
cd app
uvicorn main:app --reload

# Open http://localhost:8000/static/index.html
```

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🔒 Security Notes

- Demo mode stores data in browser local storage
- No data is sent to external servers in demo mode
- For production, implement proper authentication and validation

## 🚀 Future Enhancements

- [ ] User authentication
- [ ] Image uploads
- [ ] Export/import functionality
- [ ] Advanced search filters
- [ ] Dark mode theme

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify GitHub Pages settings
3. Ensure all files are in the correct location

## 📄 License

This project is open source and available under the MIT License.
