import requests
from urllib.parse import urlencode

def get_ordinal_suffix(rank):
    return 'th' if 11 <= rank % 100 <= 13 else {1: 'st', 2: 'nd', 3: 'rd'}.get(rank % 10, 'th')

def find_repository_rank(repo_fullname):
    url = f"https://api.github.com/search/repositories?{urlencode({'q': 'stars:>100000', 'o': 'desc', 's': 'stars'})}"
    try:
        response = requests.get(url, headers={"Accept": "application/vnd.github.v3+json"})
        response.raise_for_status()
        repositories = response.json().get("items", [])
        for rank, repo in enumerate(repositories, start=1):
            if repo['full_name'].lower() == repo_fullname.lower():
                return f"{rank}{get_ordinal_suffix(rank)}"
    except requests.RequestException as e:
        print(f"Error: {e}")
    return "Not found"

def main():
    print(find_repository_rank('kamranahmedse/developer-roadmap'))

if __name__ == "__main__":
    main()
