=== wp Time Machine ===
Tags: plugins archive archives backup backups remote offsite
Contributors: Paul G Petty
Requires at least: 3.0.0
Tested up to: 3.8.1
Stable tag: 3.4.0

== Description ==

Create archives of all your WordPress data & files and have them stored remotely. That's right! Remote storage of...

1. Your data (from your WordPress MySQL database)
2. Your files (and Uploads) -- everything in wp-content
3. Your .htaccess file
4. Instructions for a smooth recovery
5. A shell script that can help automate recovery -- though this is still a "work in progress"

You provide the remote account; this plugin provides a connection to the offsite facility you choose. Choose from...

1. You can use Dropbox: https://www.dropbox.com/
2. Also, archives can be 'sent' to Amazon's AWS S3: https://s3.amazonaws.com
3. And, FTP is now supported as well (just provide an _offsite_ host, username & password, and optionally a remote directory on that host)

Some recent improvements include:

1. A new option to exclude cache directories
2. Automatic exclusion of MySQL tables that don't start with your table prefix

Check out http://wptimemachine.com for more information.

__This Plugin requires PHP5 (Version 2.0.20 was the last release to support PHP4)__

== Installation ==

The easiest way to install:

1. Under the 'Plugins' menu in WordPress select 'Add New'
2. Enter 'wp Time Machine' into the search box
3. Choose the 'install' option

The Subversion way:

1. Navigate to wp-content/plugins/
2. svn co http://plugins.svn.wordpress.org/wp-time-machine/trunk/ ./wp-time-machine

And, the old way:

1. Download the plugin archive and expand it
2. Put the unzipped files in your wp-content/plugins/ directory.
3. Click "wp Time Machine" in the Settings Menu

== Frequently Asked Questions ==

Here are the best places to get help...

http://wordpress.org/tags/wp-time-machine?forum_id=10 [The WordPress forum]

http://wptimemachine.com

