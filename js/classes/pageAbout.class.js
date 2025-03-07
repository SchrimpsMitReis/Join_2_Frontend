class About extends Page {
    helpContent() {
        return /*html*/ `
            <div class="help-content">
                <div class="left-arrow">
                    <button onclick="backToPage()" class="left-arrow-btn"><img src="./IMG/arrow-left-line.png"></button>
                </div>
                <h1 class="help-headline">Help</h1>
                <p>Welcome to the help page for <span class="text-lightblue">Join</span>, 
                    your guide to using our kanban project 
                    management tool. Here, we'll provide 
                    an overview of what <span class="text-lightblue">Join</span> is, how it 
                    can benefit you, and how to use it.</p>
                <h2>What is Join?</h2>
                <p><span class="text-lightblue">Join</span> is a kanban-based project management tool designed and built by a group of dedicated students as part of their web development bootcamp at the Developer Akademie. <br><br>
                    Kanban, a Japanese term meaning "billboard", is a highly effective method to visualize work, limit work-in-progress, and maximize efficiency (or flow). <span class="text-lightblue">Join</span> leverages the 
                    principles of kanban to help users manage their tasks and projects in an intuitive, visual interface. <br><br>
                    It is important to note that <span class="text-lightblue">Join</span> is designed as an educational exercise and is not intended for extensive business usage. 
                    While we strive to ensure the best possible user experience, we cannot guarantee consistent availability, reliability, accuracy, 
                    or other aspects of quality regarding <span class="text-lightblue">Join</span>.</p>
                <h2>How to use it</h2>
                <p>Here is a step-by-step guide on how to use <span class="text-lightblue">Join</span>:</p>
                <ol>
                    <li><h3>Exploring the Board</h3>
                        <p>When you log in to <span class="text-lightblue">Join</span>, you'll find a default board. This board represents your project and contains four default lists: "To Do", "In Progress", “Await feedback” and "Done".</p></li>
                    <li><h3>Creating Contacts</h3>
                        <p>In <span class="text-lightblue">Join</span>, you can add contacts to collaborate on your projects. Go to the "Contacts" section, click on "New contact", and fill in the required information. Once added, these contacts can be assigned tasks and they can interact with the tasks on the board.</p></li>
                    <li><h3>Adding Cards</h3>
                        <p>Now that you've added your contacts, you can start adding cards. Cards represent individual tasks. Click the "+" button under the appropriate list to create a new card. Fill in the task details in the card, like task name, description, due date, assignees, etc..</p></li>
                    <li><h3>Moving Cards</h3>
                        <p>As the task moves from one stage to another, you can reflect that on the board by dragging and dropping the card from one list to another.</p></li>
                    <li><h3>Deleting Cards</h3>
                        <p>Deleting Cards
                            Once a task is completed, you can either move it to the "Done" list or delete it. Deleting a card will permanently remove it from the board. Please exercise caution when deleting cards, as this action is irreversible.<br><br>

                            Remember that using <span class="text-lightblue">Join</span> effectively requires consistent updates from you and your team to ensure the board reflects the current state of your project.<br><br>

                            Have more questions about <span class="text-lightblue">Join</span>? Feel free to contact us at [Your Contact Email]. We're here to help you!
                            </p></li>
                </ol>

                <h2>Enjoy using Join!</h2>
            </div>
        `
    }
    privacyContent() {
        return /*html*/ `
        <div class="privacyContent">
            <button onclick="backToPage()" class="res-left-arrow-btn pl-arrow">
                <img src="./IMG/arrow-left-line.png" alt="">
            </button>
            <h1>Privacy Policy</h1>

            <p>This privacy policy informs users about the nature, scope, and purposes of the collection 
                and use of personal data by Beispielfirma on this website (www.beispielfirma.de).
                The legal basis for data protection can be found in the Federal Data Protection Act (BDSG) and the Telemedia Act (TMG).</p>

            <h2>1. Data Controller</h2>

            <p>The data controller, as defined by data protection laws, is:</p>

            <address>
                Beispielfirma<br>
                Musterweg 10<br>
                67548 Musterstadt<br><br>
                Telefon: +49 (0) 123 44 55 66<br>
                E-Mail: info@beispielfirma.de
            </address>

            <h2>2. Types of Processed Data</h2>

            <ul>
                <li><strong>Contact information:</strong> Name, E-Mail-Address, Phone Number.</li> 
                <li><strong>Usage Data:</strong> IP-Address, Browser-Type and Version, Operating System.</li>
            </ul>

            <h2>3. Purposes of Data Processing</h2>

            <p>We process personal data only for specific purposes, including:</p>

            <ul>
                <li>Providing and improving our services.</li>
                <li>Responding to inquiries and communicating with users.</li>
                <li>Ensuring security and protection against fraudulent activities.</li>
            </ul>

            <h2>4. Data Disclosure to Third Parties</h2>

            <p>We do not disclose personal data without consent, unless it is necessary to fulfill our contractual obligations or required by law.</p>

            <h2>5. Cookies</h2>

            <p>This website uses cookies to enhance user experience. Cookies are small text files stored on your device. You can disable the use of cookies in your browser settings.</p>

            <h2>6. Analytics Tools</h2>

            <p>This website uses [e.g., Google Analytics], a web analytics service provided by [Google LLC]. The usage is based on Art. 6 para. 1 lit. f. GDPR.</p>

            <h2>7. Data Security</h2>

            <p>We implement technical and organizational security measures to protect personal data against accidental or unlawful destruction, loss, alteration, unauthorized disclosure, or access.</p>

            <h2>8. Data Subject Rights</h2>

            <p>You have the right to access, rectify, delete, or restrict the processing of your stored personal data.</p>

            <h2>9. Changes to this Privacy Policy</h2>

            <p>This privacy policy may change. The current version is available on our website.</p>

            <p>For privacy-related inquiries, please contact us at E-Mail: <a class="link-email" href="mailTo:info@beispielfirma.de">info@beispielfirma.de</a></p>
        </div>
        `
    }
    legalNoticeContent() {
        return /*html*/ `
        <div class="privacyContent">
            <button onclick="backToPage()" class="res-left-arrow-btn pl-arrow">
                <img src="./IMG/arrow-left-line.png" alt="">
            </button>
            <h1>Legal Notice</h1>
            <h2>Imprint</h2>
            <ul>
                <li>Roman Schröder <br> Siebengebirgsweg 10 <br> 53424 Remagen</li><br>
                <li>Stefan Ryll <br> Mittelstraße 5 <br> 67547 Worms</li><br>
                <li>Dominik Hucka <br> Peteräcker 6 <br> 72581 Dettingen an der Ems</li><br>
            </ul>
            <h3>Exploring</h3>
            <p>Email: roman.schroeder@inclufilm.com</p>
            <h3>Acceptance of terms</h3>
            <p>By accessing and using Join (Product), you acknowledge and
                agree to the following terms and conditions, and any policies,
                guidelines, or amendments thereto that may be presented to you from
                time to time. We, the listed students, may update or change the terms
                and conditions from time to time without notice.</p>
            <h3>Scope and ownership of the product</h3>
            <p>Join has been developed as part of a student group project in a web development
                bootcamp at the Developer Akademie GmbH. It has an educational purpose and is
                not intended for extensive personal & business usage. As such, we cannot
                guarantee consistent availability, reliability, accuracy, or any other
                aspect of quality regarding this Product.</p>

            <p>The design of Join is owned by the Developer Akademie GmbH. Unauthorized use,
                reproduction, modification, distribution, or replication of the design is
                strictly prohibited.</p>

            <h3>Proprietary rights</h3>
            <p>Aside from the design owned by Developer Akademie GmbH, we, the listed students,
                retain all proprietary rights in Join, including any associated copyrighted
                material, trademarks, and other proprietary information.</p>

            <h3>Use of the product</h3>
            <p>Join is intended to be used for lawful purposes only, in accordance with all
                applicable laws and regulations. Any use of Join for illegal activities, or
                to harass, harm, threaten, or intimidate another person, is strictly prohibited.
                You are solely responsible for your interactions with other users of Join.</p>

            <h3>Disclaimer of warranties and limitation of liability</h3>
            <p>Join is provided "as is" without warranty of any kind, whether express or implied,
                including but not limited to the implied warranties of merchantability, fitness
                for a particular purpose, and non-infringement. In no event will we, the listed
                students, or the Developer Akademie, be liable for any direct, indirect, incidental,
                special, consequential or exemplary damages, including but not limited to, damages
                for loss of profits, goodwill, use, data, or other intangible losses, even if we
                have been advised of the possibility of such damages, arising out of or in connection
                with the use or performance of Join.</p>

            <h3>Indemnity</h3>
            <p>You agree to indemnify, defend and hold harmless us, the listed students, the Developer
                Akademie, and our affiliates, partners, officers, directors, agents, and employees,
                from and against any claim, demand, loss, damage, cost, or liability (including reasonable
                legal fees) arising out of or relating to your use of Join and/or your breach of this Legal Notice. </p>
                
            <p>For any questions or notices, please contact us at [Contact Email].</p>
                
            <p>Date: July 26, 2023</p>

        </div>
        `
    }
}