import { Component } from '@angular/core';

@Component({
    selector: 'app-welcome',
    standalone: true,
    template: `
    <div class="content">
      <h2>Welcome to the Pyramid Drafting website.</h2>
        <p>
            This is a side project I created so I could draft with my brother/friends/wife remotely very easily. 
            I was looking for a good way to draft a cube with just two people and have a good mix and view of an entire cube. 
            This lead me to find this 
            <a href="https://desolatelighthouse.wordpress.com/2020/12/21/pyramid-draft/" target="_blank" rel="noopener noreferrer">wordpress</a> 
            site and the pyramid draft process. 
            I tested this out on my own time, and it seemed to work really well, the largest downside however, was the time investment to shuffle a cube, 
            and then create every pack of cards needed to conduct the actual draft. It is very cumbersome to do by hand, so I wanted a better way to do it. 
            At this same time I wanted to start a new side project with my time as I recently was promoted from a software engineer 
            to a manager, which would lead me to having a far less technical career, to being another corporate shill in the machine. 
            I was able to make the back end in a day or two as that type of software is my specialty. Once I had that the scope of the project 
            spiraled out of control as my vision for the project grew and grew, as well as asks from my greedy brother to try and recreate Cockatrice... 
            Please enjoy as much as you can, and if you have any suggestions, check out the footer and drop me an email and I will see what I can do with adding it. 
            Front end development is definitely my shackle, as I pretty much used this project to learn it all, so it is definitely shaky. 
            Get started by selecting the buttons at the top, each with have an explanation of what it is when you select it.
        </p>
    </div>
    `,
    styleUrl: './welcome.component.css',
    imports: [
    ]
})
export class WelcomeComponent {

  constructor() {}
}