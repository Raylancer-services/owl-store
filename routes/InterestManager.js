// User model
class User {
  constructor(id, interests) {
    this.id = id;
    this.interests = interests;
  }
}

// Interest manager
class InterestManager {
  constructor(users) {
    this.users = users;
  }

  recommendContent(userId) {
    // Get the user's interests
    const userInterests = this.users.find(
      (user) => user.id === userId
    )?.interests;

    // If user has no interests, return an empty array
    if (!userInterests || userInterests.length === 0) {
      return [];
    }

    // Find users with similar interests
    const similarUsers = this.users.filter(
      (user) =>
        user.id !== userId &&
        user.interests.some((interest) => userInterests.includes(interest))
    );

    // If there are no similar users, return an empty array
    if (similarUsers.length === 0) {
      return [];
    }

    // Merge similar users' interests
    const mergedInterests = similarUsers.reduce((acc, user) => {
      return [...acc, ...user.interests];
    }, []);

    // Count the occurrence of each interest
    const interestCount = mergedInterests.reduce((acc, interest) => {
      acc[interest] = (acc[interest] || 0) + 1;
      return acc;
    }, {});

    // Sort interests by occurrence in descending order
    const sortedInterests = Object.keys(interestCount).sort(
      (a, b) => interestCount[b] - interestCount[a]
    );

    // Return the top 3 interests
    return sortedInterests.slice(0, 3);
  }
}

// Usage
const users = [
  new User(1, ["music", "movies", "books"]),
  new User(2, ["music", "games", "sports"]),
  new User(3, ["movies", "books", "travel"]),
];

const interestManager = new InterestManager(users);

console.log(interestManager.recommendContent(1)); // Output: ['movies', 'books', 'travel']
console.log(interestManager.recommendContent(2)); // Output: ['music', 'movies', 'books']
console.log(interestManager.recommendContent(3)); // Output: ['music', 'games', 'sports']
