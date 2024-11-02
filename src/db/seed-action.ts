'use server';

import { revalidatePath } from 'next/cache';

export const seed = async () => {
	// const usersData: User[] = [
	// 	{
	// 		id: '1',
	// 		name: 'John Doe',
	// 		github: '',
	// 		email: 'user1@email.cz',
	// 		emailVerified: null,
	// 		firstName: 'John',
	// 		lastName: 'Doe',
	// 		image: null,
	// 		lectorId: null,
	// 		projectId: null,
	// 		role: 'student'
	// 	},
	// 	{
	// 		id: '2',
	// 		name: 'Jane Smith',
	// 		github: '',
	// 		email: 'user2@email.cz',
	// 		emailVerified: null,
	// 		firstName: 'Jane',
	// 		lastName: 'Smith',
	// 		image: null,
	// 		lectorId: null,
	// 		projectId: null,
	// 		role: 'student'
	// 	},
	// 	{
	// 		id: '3',
	// 		name: 'Carlos Rodriguez',
	// 		github: '',
	// 		email: 'user3@email.com',
	// 		emailVerified: null,
	// 		firstName: 'Carlos',
	// 		lastName: 'Rodriguez',
	// 		image: null,
	// 		lectorId: null,
	// 		projectId: null,
	// 		role: 'student'
	// 	},
	// 	{
	// 		id: '4',
	// 		name: 'Anna Johnson',
	// 		github: '',
	// 		email: 'user4@email.com',
	// 		emailVerified: null,
	// 		firstName: 'Anna',
	// 		lastName: 'Johnson',
	// 		image: null,
	// 		lectorId: null,
	// 		projectId: null,
	// 		role: 'student'
	// 	},
	// 	{
	// 		id: '5',
	// 		name: 'Ahmed Khan',
	// 		github: '',
	// 		email: 'user5@email.com',
	// 		emailVerified: null,
	// 		firstName: 'Ahmed',
	// 		lastName: 'Khan',
	// 		image: null,
	// 		lectorId: null,
	// 		projectId: null,
	// 		role: 'student'
	// 	},
	// 	{
	// 		id: '6',
	// 		name: 'Maria Garcia',
	// 		github: '',
	// 		email: 'user6@email.com',
	// 		emailVerified: null,
	// 		firstName: 'Maria',
	// 		lastName: 'Garcia',
	// 		image: null,
	// 		lectorId: null,
	// 		projectId: null,
	// 		role: 'student'
	// 	},
	// 	{
	// 		id: '7',
	// 		name: 'Michael Brown',
	// 		github: '',
	// 		email: 'user7@email.com',
	// 		emailVerified: null,
	// 		firstName: 'Michael',
	// 		lastName: 'Brown',
	// 		image: null,
	// 		lectorId: null,
	// 		projectId: null,
	// 		role: 'student'
	// 	},
	// 	{
	// 		id: '8',
	// 		name: 'Lucy Miller',
	// 		github: '',
	// 		email: 'user8@email.com',
	// 		emailVerified: null,
	// 		firstName: 'Lucy',
	// 		lastName: 'Miller',
	// 		image: null,
	// 		lectorId: null,
	// 		projectId: null,
	// 		role: 'student'
	// 	},
	// 	{
	// 		id: '9',
	// 		name: 'David Lee',
	// 		github: '',
	// 		email: 'user9@email.com',
	// 		emailVerified: null,
	// 		firstName: 'David',
	// 		lastName: 'Lee',
	// 		image: null,
	// 		lectorId: null,
	// 		projectId: null,
	// 		role: 'student'
	// 	},
	// 	{
	// 		id: '10',
	// 		name: 'Sara Wilson',
	// 		github: '',
	// 		email: 'user10@email.com',
	// 		emailVerified: null,
	// 		firstName: 'Sara',
	// 		lastName: 'Wilson',
	// 		image: null,
	// 		lectorId: null,
	// 		projectId: null,
	// 		role: 'student'
	// 	}
	// ];

	// const lecturesData: Lecture[] = [
	// 	{
	// 		id: 'intro',
	// 		name: 'Introduction',
	// 		slug: 'introduction',
	// 		preview:
	// 			'"PV247 Modern Web Development" at Masaryk University is a comprehensive course that teaches students to build full-stack applications using React and Next.js. Guided by expert developers, participants learn through practical assignments and complete a project at the end.',
	// 		availableFrom: '2024-09-23T06:00:00',
	// 		homeworkClassroomLink: '',
	// 		homeworkMaxPoints: 10,
	// 		homeworkName: 'TypeScript',
	// 		homeworkPreview:
	// 			"This week's TypeScript assignment involves enhancing an npm project by defining types and implementing four functions. Follow the descriptions in the project files, ensure your code passes linter checks, and matches the provided output.",
	// 		homeworkSlug: 'typescript',
	// 		homeworkDeadline: '2024-09-30T22:00:00'
	// 	},
	// 	{
	// 		id: 'react',
	// 		name: 'React',
	// 		slug: 'react',
	// 		preview:
	// 			"Today's lecture introduces React, highlighting its role in developing dynamic Single Page Applications (SPAs) and efficient data management through the component tree for streamlined user interfaces.",
	// 		availableFrom: '2024-09-30T06:00:00',
	// 		homeworkClassroomLink: '',
	// 		homeworkMaxPoints: 10,
	// 		homeworkName: 'React basics',
	// 		homeworkPreview:
	// 			'This week, create a React page in Next.js to display and add GitHub repositories. Build a form for new entries and a list to show existing ones, with validation and conditional messages.',
	// 		homeworkSlug: 'react-basics',
	// 		homeworkDeadline: '2024-10-07T22:00:00'
	// 	},
	// 	{
	// 		id: 'styling',
	// 		name: 'Styling',
	// 		slug: 'styling',
	// 		preview:
	// 			"Today's lecture covers various styling methods for web applications, including CSS, Sass, CSS-in-JS, and TailwindCSS. We'll discuss how these techniques enhance user experience and streamline development. Additionally, we'll emphasize the importance of accessibility in web design.",
	// 		availableFrom: '2024-10-07T06:00:00',
	// 		homeworkClassroomLink: '',
	// 		homeworkMaxPoints: 30,
	// 		homeworkName: 'Styling - tailwindcss',
	// 		homeworkPreview:
	// 			'This week, style a responsive page using TailwindCSS to display a GitHub repository description. The layout should include fixed top navigation, sidebars, and main content. Ensure responsiveness and basic accessibility.',
	// 		homeworkSlug: 'styling',
	// 		homeworkDeadline: '2024-10-14T22:00:00'
	// 	},
	// 	{
	// 		id: 'hooks',
	// 		name: 'React hooks, state',
	// 		slug: 'hooks',
	// 		preview:
	// 			'React hooks, introduced in React 16.8, enable functional components to manage state, handle side effects, and access context without class components. Hooks like useState and useEffect simplify logic, promote code reuse, and encourage a functional approach to React development.',
	// 		availableFrom: '2024-10-14T06:00:00',
	// 		homeworkClassroomLink: '',
	// 		homeworkMaxPoints: 10,
	// 		homeworkName: 'React state',
	// 		homeworkPreview:
	// 			"This week's task is to develop an interactive 'Task Manager' SPA that allows users to add, delete, and filter tasks using a provided useInitialTasks() hook. Users can reset the application to display tasks from the 'original database' only, without any applied filters or added tasks. The application does not need to be responsive.",
	// 		homeworkSlug: 'state',
	// 		homeworkDeadline: '2024-10-21T22:00:00'
	// 	},
	// 	{
	// 		id: 'other-hooks-refs-tables',
	// 		name: 'Hooks, refs, tables',
	// 		slug: 'other-hooks-refs-tables',
	// 		preview:
	// 			'This session covers advanced React hooks like useRef and forwardRef, global state management, and practical use of the tanstack-table library for efficient table handling in React applications.',
	// 		availableFrom: '2024-10-21T06:00:00',
	// 		homeworkClassroomLink: '',
	// 		homeworkMaxPoints: 20,
	// 		homeworkName: 'Table, ref, memo',
	// 		homeworkPreview:
	// 			'This week, implement a user management application that dynamically updates a table when adding users via a dialog-based form. Optimize performance using memoization, enable sorting for all table columns. Integrate a dialog component from the shadcn library for form submissions',
	// 		homeworkSlug: 'table-memo',
	// 		homeworkDeadline: '2024-10-28T22:00:00'
	// 	},
	// 	{
	// 		id: 'async-forms',
	// 		name: 'Async, forms',
	// 		slug: 'async-forms',
	// 		preview:
	// 			'This lesson revisits React Context for global state management, explores asynchronous operations, introduces the Tanstack Query library for data fetching, discusses runtime validation with Zod, and handles forms efficiently with React Hook Form.',
	// 		availableFrom: '2024-10-28T06:00:00',
	// 		homeworkClassroomLink: '',
	// 		homeworkMaxPoints: 40,
	// 		homeworkName: 'Forms, working with async data',
	// 		homeworkPreview:
	// 			"This week, develop a 4-page application that handles user authentication, displays gifts, and allows gift creation via API interactions. Utilize tanstack-query, react-hook-form, and zod. Focus on role-specific functionalities: 'santa' can update gift statuses, while 'user' can add new gifts.",
	// 		homeworkSlug: 'forms-async',
	// 		homeworkDeadline: '2024-11-04T22:00:00'
	// 	},
	// 	{
	// 		id: 'nextjs',
	// 		name: 'Next.js - the React framework',
	// 		slug: 'nextjs',
	// 		preview:
	// 			"Next.js extends React's capabilities for full-stack web development, featuring server-side rendering and efficient data fetching. It simplifies building web apps with SEO-friendly routing and dynamic content strategies. The next lesson will explore server-side rendering and advanced routing in more detail.",
	// 		availableFrom: '2024-11-04T06:00:00',
	// 		homeworkClassroomLink: '',
	// 		homeworkMaxPoints: 20,
	// 		homeworkName: 'Next.js basics, routing',
	// 		homeworkPreview:
	// 			'This week, set up routing for a TODO application in Next.js, focusing on handling loading, error, and navigation across pages like /list and /new. Ensure consistent layouts for the todo detail pages using Next.js route groups.',
	// 		homeworkSlug: 'nextjs-basic',
	// 		homeworkDeadline: '2024-11-11T22:00:00'
	// 	},
	// 	{
	// 		id: 'suspense-streaming-rsc',
	// 		name: 'Suspense, streaming, RSC',
	// 		slug: 'suspense-streaming-rsc',
	// 		preview:
	// 			"This lesson covers Next.js's server-side rendering and React Server Components to enhance SEO and performance. It explains how Next.js uses server components by default and requires explicit client component declarations. Upcoming topics will address custom API endpoints and caching strategies in Next.js.",
	// 		availableFrom: '2024-11-11T06:00:00',
	// 		homeworkClassroomLink: '',
	// 		homeworkMaxPoints: 30,
	// 		homeworkName: 'Suspense, React Server Components',
	// 		homeworkPreview:
	// 			'This week, create a Next.js app for CRUD operations on a movie database. Implement pages for adding movies, listing all movies with edit and delete options using React Server Components, and editing movie details. Use React Hook Form, Zod for validation, and tanstack query for API management.',
	// 		homeworkSlug: 'rsc-forms',
	// 		homeworkDeadline: '2024-11-18T22:00:00'
	// 	},
	// 	{
	// 		id: 'api-configs-server-actions-database',
	// 		name: 'API routes, configs, caching, server actions, database',
	// 		slug: 'api-configs-server-actions-database',
	// 		preview:
	// 			"This lecture, we'll be focusing on custom API endpoints, route segment configs, caching, and revalidation options for cache layers. We'll explore server actions that allow for server-side processing without the need for API routes and discuss how to interact with databases using TypeScript.",
	// 		availableFrom: '2024-11-18T06:00:00',
	// 		homeworkClassroomLink: '',
	// 		homeworkMaxPoints: 40,
	// 		homeworkName: 'API, server actions, database',
	// 		homeworkPreview:
	// 			'This week, modify the 6th task to use server actions and React Server Components for data management, ensuring persistent user sessions with server-side storage. Replace API calls with server actions, and manage data using a local sqlite database via Drizzle ORM.',
	// 		homeworkSlug: 'api-actions-database',
	// 		homeworkDeadline: '2024-11-25T22:00:00'
	// 	},
	// 	{
	// 		id: 'authentication-metadata-deployment',
	// 		name: 'Authentication, metadata, deployment',
	// 		slug: 'authentication-metadata-deployment',
	// 		preview:
	// 			"This final lesson, we'll delve into user authentication, leveraging metadata for better visibility, and explore simple deployment options with Vercel. We'll also demonstrate practical authentication implementation using the next-auth library with GitHub.",
	// 		availableFrom: '2024-11-25T06:00:00',

	// 		// No homework for last lesson
	// 		homeworkClassroomLink: '',
	// 		homeworkMaxPoints: 0,
	// 		homeworkName: '',
	// 		homeworkPreview: '',
	// 		homeworkSlug: '',
	// 		homeworkDeadline: ''
	// 	}
	// ];

	// for (const user of usersData) {
	// 	await db.insert(users).values(user);
	// }

	// for (const lecture of lecturesData) {
	// 	await db.insert(lectures).values(lecture);
	// }

	revalidatePath('/', 'layout');
};
