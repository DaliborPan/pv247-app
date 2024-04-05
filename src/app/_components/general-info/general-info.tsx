export const GeneralInfo = () => (
	<section className="styled-md">
		<h2>General Info</h2>

		<p>General info about the course</p>

		<h3>Team</h3>

		<p>
			Our tutoring team is made up of developers from FI MUNI partner company
			InQool a.s. Most of us are FI alumni and each week a different duo will
			teach.
		</p>

		<h3>Communication</h3>

		<p>
			As a main channel for communication, we will use our discord server (not
			MUNI). You can also contact us via faculty emails, but there is a high
			chance that you will get your answers much quicker in the chat group. You
			will receive discord invite link in your faculty email.
		</p>

		<h3>Seminars</h3>

		<p>
			Each seminar will consist of two parts. The first half will be dedicated
			to explaining the current week&apos;s topics. In the second half of the
			seminar, you will be solving the current week&apos;s assignments (more on
			those later). Also don&apos;t be afraid to ask questions, especially
			during the second half of the seminar.
		</p>

		<h3>Attendance</h3>

		<p>Course attendance is mandatory. Each student is allowed to have:</p>

		<ul>
			<li>2 unexcused lesson</li>
			<li>Unlimited excused lesson</li>
		</ul>

		<h3>Evaluation</h3>

		<p>Students collect points for these activities:</p>

		<ul>
			<li>Up to 210 points from tasks (9 x task for each week)</li>
			<li>Up to 250 points from a team project</li>
			<li>
				Extra points for active students (especially clean/smart task solutions,
				activity during lectures, and in the communication discord)
			</li>
		</ul>

		<p>At least 320 is required to pass the course.</p>

		<h3>Weekly assignments</h3>

		<p>
			For (almost) every lecture there will be a weekly assignment for you to
			do. You always have 1 week to solve it (deadline is at midnight the night
			before next lecture).
		</p>

		<h3>Accepting an assignment</h3>

		<p>
			To work on assignments you need to have a GitHub account. We will be using
			Github Classroom for distributing and submitting the assignments.
		</p>

		<p>
			<strong>IMPORTANT!</strong> When accepting first assignment you will be
			asked to authorize GitHub Classroom to access your account. You will also
			be asked to select your UCO and name from the list of students, so your
			GitHub account can be linked. If you don&apos;t see your UCO on the list
			or you somehow skip the step, please contact us so we can link it
			manually.
		</p>

		<p>
			Each assignment will have an invitation link that should look like example
			below that will be sent via email
		</p>

		<p>
			Accept the assignment and use the provided link to get to your repository.
			Instructions will be provided in `README.MD`. You should then clone the
			repository or you can also use Github&apos;s built in VS Code editor by
			pressing `.` or changing `.com` to `.dev` on repository dashboard (you can
			read more about this feature
			<a href="https://docs.github.com/en/codespaces/developing-in-codespaces/web-based-editor">
				here
			</a>
			).
		</p>

		<h3>Submitting the finished assignment</h3>

		<p>
			After accepting the assignment, apart from starter code and instructions,
			your repository should contain a **Feedback** pull request merging from
			`master` to a `feedback` branch. Push your change to `master` branch and
			when you are done
			[label](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels#applying-a-label)
			the **Feedback** PR with a `Submitted` label. There is an automatic
			pipeline to build & lint your project.
		</p>

		<p>
			There should be a successful submission **before** the deadline otherwise
			you will be penalized. Important timestamp is of you labeling the PR as
			`Submitted`.
		</p>

		<p>
			You can also resubmit your work before deadline multiple times by removing
			the label, pushing changes and labeling it again.
		</p>

		<h3>Feedback</h3>

		<p>
			After submissions close we will review them using Github&apos;s PR review.
			Feel free to reply to the comments and ask questions about the feedback.
		</p>

		<h3>Team project</h3>

		<p>
			Majority of points are awarded for the team project you will be working on
			near the end of the course. Before 8th lecture you should all have a team
			and a project topic selected and accepted. Contact us with your project
			ideas anytime and we will put together an appropriate scope for it.
			Projects will be presented during the last seminar.
		</p>

		<h3>Base requirements</h3>

		<ul>
			<li>Team of 3-4 students</li>
			<li>README.MD containing specification and scope of the project</li>
			<li>Access to source code</li>
			<li>Presentation of the project (~10 min)</li>
			<ul>
				<li>project overview and demo (~5 min)</li>
				<li>
					highlight interesting parts of your code (used libraries, custom hooks
					etc.) (~5 min)
				</li>
			</ul>
		</ul>

		<h3>Technological requirements</h3>

		<ul>
			<li>All features implemented</li>
			<li>
				Git collaboration (each student must have a contribution to the
				codebase)
			</li>
			<li>Responsive design</li>
			<li>User authentication</li>
			<li>Server-side rendering alongside client-side rendering</li>
			<li>Database (CRUD operations)</li>
			<li>Proper metadata</li>
			<li>Hosted online (Vercel)</li>
		</ul>

		<h3>Example projects from previous semesters</h3>

		<p>TBA</p>
	</section>
);
