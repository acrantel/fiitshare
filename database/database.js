var userData = {
    user1: {
        workouts: ['wk1', 'wk2', 'wk3', 'wk4', 'wk5'],
        recent_workouts: ['wk2', 'wk3', 'wk5'],
        groups: ['group1', 'group2'],
        name: 'John Doe',
        picture: '/images/user1.jpeg',
        calories: 2000,
        // minutes
        time_spent: 540,
        completed_workouts: 12,
    },
    user2: {
    },
};

var workoutData = {
    wk1: {
        creator: 'user1',
        name: 'Morning',
        intensity: 'beginner',
        length: 20, // minutes
        calories: 200,
        exercises: {
            exerciseId: [1, 2, 1],
            time: [50, 40, 40],
    },
    wk2: {

    },
    wk3: {

    },
    wk4: {

    }

}
};

var exerciseData = {
    1: {
        name: 'squats',
        video_link: '/exercise/1.gif'
    },
    2: {
        name: 'pushups',
        video_link: '/exercise/2.gif'
    }
}

var groupData = {
    group1: {
        name: 'G Period',
        image: "/groups/group1.jpg",
        level: 'Beginner',
        description: "Anderson's G Period PE Class",
        members: ['user1', 'user2'], // user id's
        admins: ['user1'], // user id's
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
    group2: {
        name: 'A Period',
        image: "/groups/group1.jpg",
        level: 'Intermediate',
        description: "Anderson's A Period PE Class",
        members: ['user1', 'user2'], // user id's
        admins: ['user1'], // user id's
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

export { userData, workoutData, exerciseData, groupData};