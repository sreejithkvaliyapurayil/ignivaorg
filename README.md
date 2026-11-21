# IGNIVA Group website

Static HTML, CSS and JavaScript for GitHub Pages. The executive profile is based on the supplied Nijesh Puthalath PDF. The portrait and group logo are from that PDF. The two architectural concepts are from the IGNIVA Tech Island repository.

## Preview

Run `python3 -m http.server 8000` from this directory and open `http://localhost:8000/`. The site has no build dependencies.

## Publish

1. Create a separate GitHub repository for this site. Upload the files at the repository root.
2. In **Settings → Pages**, select **Deploy from a branch**, then `main` and `/ (root)`. To test on the default GitHub Pages address first, leave out the supplied `CNAME` file until cutover.
3. Confirm whether the existing igniva.org site should be replaced or kept on a separate hostname. Back up the current website and DNS settings before a replacement.
4. Set the GitHub Pages custom domain to `www.igniva.org`. At the DNS provider, update the `www` CNAME to the account’s GitHub Pages hostname. Preserve mail records. If the apex `igniva.org` should serve or redirect to the same site, follow GitHub’s apex-domain setup.
5. Verify the new homepage at the custom domain and enable **Enforce HTTPS** once GitHub offers it.

[GitHub Pages custom-domain documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
