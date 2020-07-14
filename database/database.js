var userData = {
    user1: {
        workouts: ['wk1', 'wk2', 'wk3', 'wk4', 'wk5'],
        recent_workouts: ['wk1', 'wk3', 'wk5'],
        groups: ['group1', 'group2'],
        name: 'John Doe',
        picture: '/images/user1.jpeg',
        cover_picture: '/images/user1-cover.jpg',
        calories: 2000,
        // minutes
        time_spent: 540,
        completed_workouts: 12,
    },
    user2: {
        workouts: ['wk1', 'wk2', 'wk3', 'wk4', 'wk5'],
        recent_workouts: ['wk1', 'wk3', 'wk5'],
        groups: ['group1', 'group2', 'group3', 'group4'],
        name: 'Jane Doe',
        picture: '/images/user2.jpg',
        calories: 2000,
        // minutes
        time_spent: 540,
        completed_workouts: 12,
    },
    
    user3: {
        workouts: ['wk1', 'wk2', 'wk3', 'wk4', 'wk5'],
        recent_workouts: ['wk1', 'wk3', 'wk5'],
        groups: ['group4'],
        name: 'Susan Smith',
        picture: '/images/user3.jpg',
        calories: 1000,
        // minutes
        time_spent: 540,
        completed_workouts: 12,
    },
};


var workoutData = {
    wk1: {
        creator: 'user1',
        name: 'Morning',
        intensity: 'beginner',
        length: 20, // minutes
        calories: 200,
        sets: 3,
        exercises: {
            exerciseId: [1, 2, 3],
            time: [5, 5, 5],
        }
    },
    wk2: {
        creator: 'user1',
        name: 'Morning Workout 2',
        intensity: 'Easy',
        length: 10, // minutes
        calories: 50,
        sets: 3,
        exercises: {
            exerciseId: [1, 2, 3],
            time: [50, 40, 40],
        }
    },
    wk3: {
        creator: 'user1',
        name: '20-min Intense HIIT',
        intensity: 'Hard',
        length: 20, // minutes
        calories: 200,
        sets: 3,
        exercises: {
            exerciseId: [1, 2, 3],
            time: [50, 40, 40],
        }
    },
    wk4: {
        creator: 'user1',
        name: 'Quick HIIT',
        intensity: 'Medium',
        length: 10, // minutes
        calories: 100,
        exercises: {
            exerciseId: [1, 2, 3],
            time: [50, 40, 40],
        }
    }

};

var exerciseData = {
    1: {
        name: 'Squats',
        video_link: '/images/exercise_gifs/squats.gif'
    },
    2: {
        name: 'Reverse lunge',
        video_link: '/exercise/exercise_gifs/reverselunge.gif'
    },
    3: {
        name: 'Jumping jacks',
        video_link: '/exercise/exercise_gifs/jumpingjacks.gif'
    }
}

var groupData = {
    group1: {
        name: 'G Period',
        image: "/images/groups/group1.jpg",
        level: 'Beginner',
        description: "Anderson's G Period PE Class",
        members: ['user1', 'user2'], // user id's
        admins: ['user1'], // user id's
        schedule: [
            {
                workoutId: 'wk1',
                dueBy: [2020, 6, 19, 10, 30]
            },
            {
                workoutId: 'wk1',
                dueBy: [2020, 6, 21, 10, 30]
            }
        ]
    },
    group2: {
        name: 'A Period',
        image: "/images/groups/group2.jpg",
        level: 'Intermediate',
        description: "Anderson's A Period PE Class",
        members: ['user1', 'user2', 'user3'], // user id's
        admins: ['user2'], // user id's
        schedule: [
            {
                workoutId: 'wk1',
                dueBy: [2020, 6, 19, 10, 30]
            },
            {
                workoutId: 'wk1',
                dueBy: [2020, 6, 19, 10, 30]
            }
        ]
    },
    group3: {
        name: 'C Period',
        image: "/images/groups/group3.jpg",
        level: 'Intermediate',
        description: "Anderson's C Period PE Class",
        members: [], // user id's
        admins: ['user2'], // user id's
        schedule: [
            {
                workoutId: 'wk1',
                dueBy: '19 Jul 2020 10:50:00 GMT'
            },
            {
                workoutId: 'wk1',
                dueBy: '21 Jul 2020 10:50:00 GMT'
            }
        ]
    },
    group4: {
        name: 'D Period',
        image: "/images/groups/group4.jpg",
        level: 'Advanced',
        description: "Anderson's D Period PE Class",
        members: ['user2'], // user id's
        admins: ['user3'], // user id's
        schedule: [
            {
                workoutId: 'wk1',
                dueBy: '19 Jul 2020 10:50:00 GMT'
            },
            {
                workoutId: 'wk1',
                dueBy: '21 Jul 2020 10:50:00 GMT'
            }
        ]
    }
}

const USERID = 'user1';

export { userData, workoutData, exerciseData, groupData, USERID };