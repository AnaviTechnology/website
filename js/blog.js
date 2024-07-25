document.addEventListener("DOMContentLoaded", function() {
			console.log("Hello DOMContentLoaded!");
			const postsContainer = document.getElementById('blog-posts');
			const defaultImage = 'images/anavi-news-default-image.png';

			// Function to format the date
			function formatDate(dateString) {
				const options = { year: 'numeric', month: 'long', day: 'numeric' };
				return new Date(dateString).toLocaleDateString(undefined, options);
			}

			// Function to extract the first image from post content
			function extractFirstImage(content) {
		const imgTag = content.match(/<img[^>]+srcset="[^"]*(https:\/\/[^,\s]+-300x\d+\.(?:png|jpe?g|gif))\s+300w[^"]*"/);
				return imgTag ? imgTag[1] : null;
			}

			// Function to fetch the latest posts
			function fetchPosts() {
				const url = 'https://blog.anavi.technology/wp-json/wp/v2/posts?per_page=3&_embed';

				fetch(url)
					.then(response => response.json())
					.then(posts => {
						posts.forEach(post => {
							const postElement = document.createElement('div');
							postElement.classList.add('post');

							const postImage = document.createElement('img');
							postImage.classList.add('post-image');

							// Fallback to first image in post content
							const firstImage = extractFirstImage(post.content.rendered);
							const imageUrl = firstImage ? firstImage : defaultImage;

							postImage.src = imageUrl;

							const postContent = document.createElement('div');
							postContent.classList.add('post-content');

							const postTitle = document.createElement('h3');
							postTitle.classList.add('post-title');
							const postTitleLink = document.createElement('a');
							postTitleLink.href = post.link;
							postTitleLink.textContent = post.title.rendered;
							postTitle.appendChild(postTitleLink);

							const postDate = document.createElement('div');
							postDate.classList.add('post-date');
							postDate.textContent = formatDate(post.date);

							const postExcerpt = document.createElement('p');
							postExcerpt.classList.add('post-excerpt');
				lastLinkRegex = /<a[^>]*>(.*?)<\/a>(?!.*<a[^>]*>)/;
				postExcerpt.innerHTML = post.excerpt.rendered.replace(lastLinkRegex, '');

							postContent.appendChild(postTitle);
							postContent.appendChild(postDate);
							postContent.appendChild(postExcerpt);

				const postImageLink = document.createElement('a');
							postImageLink.href = post.link;
							postImageLink.appendChild(postImage);

							postElement.appendChild(postImageLink);
							postElement.appendChild(postContent);

							postsContainer.appendChild(postElement);
						});
					})
					.catch(error => console.error('Error fetching posts:', error));
			}

			// Fetch posts on page load
			fetchPosts();
		});
