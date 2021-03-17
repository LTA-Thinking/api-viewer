const config = {
    "apis": [
        {
            "title": "API Viewer Issues",
            "uri": "https://api.github.com/repos/LTA-Thinking/api-viewer/issues?state=open",
            "columns": [
                {
                    "name": "Title",
                    "path": "title",
                    "link": "html_url"
                },
                {
                    "name": "Creator",
                    "path": "user.login",
                    "image": "user.avatar_url"
                },
                {
                    "name": "Created",
                    "path": "created_at"
                },
                {
                    "name": "Comments",
                    "path": "comments"
                }
            ]
        }
    ]
} 