// Progress bar part
let progress_meter = document.getElementById("progress_meter");

let height = document.body.scrollHeight - screen.height;
let last_position = window.scrollY;

function update_progress_meter () {
    height = document.body.clientHeight - window.innerHeight;
    current_position = window.scrollY;

    progress = Math.ceil((current_position / height) * 100);
    // Makes it looks better...
    if (progress >= 99) {
	progress = 100;
    }
    
    progress_meter.innerText = progress + "%";
}

let ticking = false;
window.addEventListener('scroll', function(e) {
    if (!ticking) {
	window.requestAnimationFrame(function() {
	    update_progress_meter();
	    ticking = false;
	});

	ticking = true;
    }
});

progress_meter.style.textDecoration = 'none';
update_progress_meter();

// Fold in terms.html

function fold_me_in_terms (element) {
    var section = element.parentElement.parentElement;
    var posts = section.getElementsByClassName('pages')[0]
    console.log(posts);
    if (posts.classList.contains('hidden')) {
	posts.classList.remove('hidden');
	element.innerText = '-';
    } else {
	posts.classList.add('hidden');
	element.innerText = '+';
    }
}

// For randomize slogan
/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

// Update btws' vertical locations, since generated locations are not very accurate
function update_btw_tops() {
	let left_items = document.getElementsByClassName('side-item');
	let items = document.getElementsByClassName('vertical-right')[0].getElementsByClassName('item-on-the-right');
	let toc = document.getElementById('toc');
	let init_height = 0;
	if (toc != undefined) {
		init_height = toc.offsetTop + toc.offsetHeight;
	}

	// First get a list of heights
	let btw_offset_top = [];
	for (let item of left_items) {
		btw_offset_top.push(item.offsetTop);
	}

	let i = 0;
	for (let btw of items) {
		console.log('init_height: ' + init_height);
		if (init_height >= btw_offset_top[i]) {
			btw.style.top = (init_height + 10) + 'px';
			console.log('init_height >= btw offset');
		} else {
			btw.style.top = btw_offset_top[i] + 'px';
		}

		init_height = btw.offsetTop+ btw.offsetHeight;
		i++;
	}
}

update_btw_tops();
