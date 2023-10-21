// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  console.log(moviesArray);
  return moviesArray.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const moviesStevenDrama = moviesArray.filter(movie => {
    return (
      movie.genre.includes('Drama') && movie.director === 'Steven Spielberg'
    );
  });

  return moviesStevenDrama.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  } // to not have a NaN result if its an empty array

  const sumOfScores = moviesArray.reduce((acc, cur) => {
    if (typeof cur.score !== 'number') {
      cur.score = 0;
    } // transform into 0 if a movie doesn't have a score

    return acc + cur.score;
  }, 0);
  const scoresAvg = +(sumOfScores / moviesArray.length).toFixed(2);
  return scoresAvg;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  // filter + reduce + avg

  const dramaMoviesArray = moviesArray.filter(movie => {
    return movie.genre.includes('Drama');
  });

  if (dramaMoviesArray.length === 0) {
    return 0;
  }

  const sumOfDramaScores = dramaMoviesArray.reduce((acc, cur) => {
    return acc + cur.score;
  }, 0);

  const dramaScoresAvg = +(sumOfDramaScores / dramaMoviesArray.length).toFixed(
    2
  );
  return dramaScoresAvg;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
// If same year (movie.year), follow alphabetical order of the title (movie.title)
function orderByYear(moviesArray) {
  const orderedMoviesArray = [...moviesArray];
  orderedMoviesArray.sort((a, b) => {
    if (a.year === b.year) {
      // to order movies alphabetically
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
    } else if (a.year > b.year) {
      return 1;
    } else {
      return -1;
    }
  });

  return orderedMoviesArray;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  // 1. Create a new array only with titles - .map

  moviesTitlesArray = moviesArray.map(movie => movie.title);

  // 2. Alphabetic order - .localeCompare
  moviesTitlesArray.sort((a, b) => a.localeCompare(b));

  // 3. Print only 20 titles - .slice
  const topTwentyMovies = moviesTitlesArray.slice(0, 20);
  return topTwentyMovies;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  let copyMoviesArray = JSON.parse(JSON.stringify(moviesArray));
  let newMoviesArray = copyMoviesArray.map(movie => {
    let moviesHours = 0;
    let moviesMinutes = 0;

    if (movie.duration.length >= 3) {
      let moviesDurationSplitted = movie.duration.split(' ', 2);
      moviesHours = parseInt(moviesDurationSplitted[0].replace('h', ''), 10);
      moviesMinutes = parseInt(
        moviesDurationSplitted[1].replace('min', ''),
        10
      );
    } else {
      let moviesDuration = movie.duration;
      moviesHours = parseInt(moviesDuration.replace('h', ''), 10);
      moviesMinutes = 0;
    }

    movie.duration = moviesHours * 60 + moviesMinutes;
    return movie;
  });

  return newMoviesArray;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  // return null if empty array
  if (moviesArray.length === 0) {
    return null;
  }

  // group movies by release year and calculate average score
  const scoresByYear = {};
  moviesArray.forEach(movie => {
    const year = movie.year;
    const score = movie.score;

    if (scoresByYear[year]) {
      scoresByYear[year].totalScore += score;
      scoresByYear[year].movieCount++;
    } else {
      scoresByYear[year] = { totalScore: score, movieCount: 1 };
    }
  });

  // find the year with the highest average score
  let bestYear = null;
  let bestAvg = 0;

  for (let year in scoresByYear) {
    const avgScore =
      scoresByYear[year].totalScore / scoresByYear[year].movieCount;
    if (
      avgScore > bestAvg ||
      (avgScore === bestAvg && parseInt(year) < parseInt(bestYear))
    ) {
      bestYear = year;
      bestAvg = avgScore;
    }
  }

  // return the message as a string
  return `The best year was ${bestYear} with an average score of ${bestAvg}`;
}
