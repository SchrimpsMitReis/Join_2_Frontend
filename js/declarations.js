/**
 * Temporary array to store subtasks.
 * @type {Array}
 */
let subtaskTemp = [];
/**
 * Temorary store of subtask_ids for conecting them to tasks
 */
let subtaskIDsTemp = []

/**
 * Temporary variable to store priority.
 * @type {string}
 */
let prioTemp = "";

/**
 * Reference to the 'body' element in the document.
 * @type {HTMLElement}
 */
let body = document.getElementById('body');

/**
 * Instance of the Page class.
 * @type {Page}
 */
let Join = new Page();

/**
 * Instance of the Login class.
 * @type {Login}
 */
let JoinLogin = new Login();

/**
 * Instance of the Summary class.
 * @type {Summary}
 */
let JoinSummary = new Summary();

/**
 * Instance of the Board class.
 * @type {Board}
 */
let JoinBoard = new Board();

/**
 * Instance of the About class.
 * @type {About}
 */
let JoinAbout = new About();

/**
 * Instance of the Contacts class.
 * @type {Contacts}
 */
let JoinContacts = new Contacts();

/**
 * Flag to track the status of policy check.
 * @type {boolean}
 */
let policyCheck = false;