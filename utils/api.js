function fetchOk (route, method = 'GET', body = null) {
    return fetch(`http://localhost:3000/api${route}`, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: method !== 'GET' ? JSON.stringify(body) : undefined
    })
        .then(res => res.ok ? res : Promise.reject(new Error(res.status)));
}

// type Exercise = { name: string, video_link: Url }
export function getExercise (exerciseId) {
    return fetchOk(`/exercise/${exerciseId}`).then(r => r.json());
}

// type Group = {
//     admins: UserId[],
//     description: string,
//     image: Url,
//     level: 'Beginner' | 'Intermediate' | 'Advanced',
//     members: UserId[],
//     name: string
// }
export function getGroup (groupId) {
    return fetchOk(`/group/${groupId}`).then(r => r.json());
}
export function setGroup (groupId, data) {
    return fetchOk(`/group/${groupId}`, 'POST', data);
}

// type Schedule = {
//     dueBy: timestamp,
//     groupId: GroupId,
//     workoutId: WorkoutId
// }

// type User = {
//     calories: number,
//     completed_workouts: int,
//     cover_picture: Url,
//     groups: GroupId[],
//     name: string,
//     profile_picture: Url,
//     recent_workouts: WorkoutId[],
//     this_week: {
//         activity: number[],
//         calories: number[]
//     },
//     time_spent: number,
//     workouts: WorkoutId[]
// }
export function getUser (userId) {
    return fetchOk(`/user/${userId}`).then(r => r.json())
}
export function setUser (userId, data) {
    return fetchOk(`/user/${userId}`, 'POST', data);
}

// type Workout = {
//     calories: number,
//     creator: UserId,
//     exercises: {
//         exerciseId: ExerciseId[],
//         time: number[]
//     },
//     intensity: 1 | 2 | 3 | 4 | 5,
//     length: number,
//     name: string,
//     sets: int
// }
export function getWorkout (workoutId) {
    return fetchOk(`/workout/${workoutId}`).then(r => r.json())
}
export function setWorkout (workoutId, data) {
    return fetchOk(`/workout/${workoutId}`, 'POST', data)
}
