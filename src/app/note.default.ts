import { iNote } from './interface/model';

export class DefaultNote implements iNote {
  readonly title =
    'Get Your Note-Taking Mojo Flowing: Meet Our Snazzy Note Editor!';
  readonly content = `
        <h1>Get Your Note-Taking Mojo Flowing: Meet Our Snazzy Note Editor!</h1>
        <p>
            Welcome to our note editor! It's a versatile and user-friendly 
            tool designed to enhance your note-taking experience. From 
            basic formatting to advanced features like lists, images, 
            and colors, you'll find everything you need to express 
            yourself and stay organized. Let's dive in and explore 
            the exciting world of our note editor together!
        </p>
        <p>
            <b>Bold:</b> To make text bold, simply select the desired 
            text and click on the <b>"B"</b> icon in the formatting toolbar. 
            Alternatively, you can use the keyboard shortcut 
            (e.g., <b>Ctrl + B</b> on Windows or <b>Command + B</b> on Mac) 
            to toggle the bold formatting.
        </p>
        <p>
            <b><i>Italic:</i></b> To italicize text, select the text and click 
            on the <b><i>"I"</i></b> icon in the toolbar. You can also use 
            the keyboard shortcut (e.g., <b>Ctrl + I</b> on Windows or <b>Command + I</b> on Mac) 
            to toggle the italic formatting.
        </p>
        <p>
            <b><u>Underline:</u></b> To underline text, select the desired text and click 
            on the <b><u>"U"</u></b> icon in the toolbar. You can also use the 
            keyboard shortcut (e.g., <b>Ctrl + U</b> on Windows or <b>Command + U</b> on Mac) 
            to toggle the underline formatting.
        </p>
        <p>
            <b><s>Strike:</s></b> To add a strike-through to text, select the relevant 
            text and click on the <b><s>"S"</s></b> icon in the toolbar. This will apply 
            a line through the text, indicating a strikethrough effect.
        </p>
        <p>
        <b>Ordered list:</b>
            To create an ordered (numbered) list:
            <ol>
                <li>
                    select the lines of text you want to turn into a 
                    list and click on the numbered list icon (1, 2, 3) in the toolbar. This will automatically 
                    format the selected text as an ordered list.
                </li>
            </ol>
        </p>
        <p>
            <b>Bullet list:</b>
            Similar to the ordered list, you can create a bullet list by selecting the relevant 
            text and clicking on the bullet list icon (•) in the toolbar. 
            <ul>
                <li>
                    This will transform the selected text into a bulleted list.
                </li>
            </ul>
        </p>
        <p>
            <b>Heading:</b> To create a heading or subheading, select the text you want to format as a 
            heading and choose the appropriate heading level from the dropdown menu in the toolbar. 
            This allows you to structure your notes and give them a hierarchical organization.
            <h1>Header 1</h1>
            <h2>Header 2</h2>
            <h3>Header 3</h3>
            <h4>Header 4</h4>
            <h5>Header 5</h5>
            <h6>Header 6</h6>
        </p>
        <p>
            <a href="">Link:</b></a> To insert a hyperlink, select the text you want to turn into a link 
            and click on the link icon (a chain link) in the toolbar. Enter the URL you 
            want to link to, and optionally, add a title for the link. Click "OK" to apply the hyperlink.
        </p>
        <p>
            <b>Image:</b> To insert an image into your note, place the cursor where you want the 
            image to appear and click on the image icon (a mountain) in the toolbar. 
            You can either upload an image from your device or provide the URL of an image hosted online.
        </p>
        <p>
            <b>Text Color:</b> To change the color of your text, select the desired text 
            and click on the color palette icon in the toolbar. Choose a color from the 
            color picker or enter a specific color code to apply it to the selected text.
        </p>
        <p>
            <b>Background Color:</b> Similar to text color, you can change the background 
            color of selected text or paragraphs. Highlight the text and click on the background 
            color icon in the toolbar. Select a color from the palette to apply it as the background color.
        </p>
        <p>
            <b>Align Left/Center/Right/Justify:</b> To align your text, select the desired text or 
            paragraphs and click on the alignment icons in the toolbar. You can align the 
            text to the left, center, right, or justify (evenly distribute the text across the width of the page).
        </p>
        <br/>
        <p>
             By using these writing editing tools, you can format and stylize your notes in a variety
             of ways to enhance readability and visual appeal. Enjoy the flexibility and 
             customization options while creating your notes!
        </p>
    `;

  readonly id = 'welcome-to-note-editor';
  readonly tags = ['Note manuel'];
  readonly date = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
