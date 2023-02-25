/*!
 * (C) Copyright 2020.
 * All Rights Reserved.
 *
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

export interface DefaultPost {
    title: string;
    content: string;
    image_url?: string;
    tags: string[];
    created_at: number;
}

export interface Post extends DefaultPost {
    id: string;
}

export const postsJson: DefaultPost[] = [
    {
        title: 'Stress Handling',
        content:
            "A few years ago I started training to become a Private Pilot and I was amazed about some knowledge that can be used in other areas! When you're going to fly an aircraft, it's very important to know your limitations as an individual, some of them are psychological and others physical. Because not handling them properly can increase the risk of an accident by far. For this example, Imagine that you can handle 80 points of stress, and you're going to do a presentation for the Investors, and you need this to be a great success, so just because of this, you will add 60 points of stress. But, yesterday you didn't sleep very well (add 5 extra points), and you are wearing a suit that is not very comfortable (another 5 points), and also you didn't eat something for breakfast because you are late (another 5 points). Every single point on the list keeps adding extra points of Stress, currently, you're inside the 80 points you can handle! But any strange comment from your investors will put you in the danger zone. In aviation, this is critical, because if you are not comfortable with your clothes, you didn't sleep well, or anything else, and your engine stops, these extra points will make the difference. So if you already know that you can be exposed to a Stress scenario, try to mitigate all these minor situations where you're adding extra points.",
        image_url:
            'https://www.grupooneair.com/wp-content/uploads/2019/11/private-pilot-course-with-cirrus-aircraft.jpeg',
        created_at: 1677355624,
        tags: ['stress', 'leadership', 'aviation'],
    },
];
