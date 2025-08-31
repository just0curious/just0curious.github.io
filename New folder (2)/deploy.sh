#!/bin/bash




echo "🚀 Preparing People Manager for GitHub Pages deployment..."


if [ ! -d "root" ]; then
    echo "❌ Error: 'root' directory not found!"
    echo "Please run this script from the project root directory."
    exit 1
fi


echo "📁 Creating deployment directory..."
rm -rf deploy
mkdir deploy


echo "📋 Copying static files..."
cp -r root/* deploy/


echo "🔧 Creating .nojekyll file..."
touch deploy/.nojekyll


echo "📝 Creating root index file..."
cat > deploy/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>People Manager - Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=./index.html">
</head>
<body>
    <p>Redirecting to People Manager...</p>
    <script>
        window.location.href = './index.html';
    </script>
</body>
</html>
EOF

echo "✅ Deployment files prepared in 'deploy/' directory!"
echo ""
echo "📋 Next steps:"
echo "1. Upload the contents of 'deploy/' to your GitHub repository"
echo "2. Enable GitHub Pages in repository settings"
echo "3. Your site will be available at: just0curious.github.io/New folder (2)/"
echo ""
echo "🎯 Files ready for upload:"
ls -la deploy/
