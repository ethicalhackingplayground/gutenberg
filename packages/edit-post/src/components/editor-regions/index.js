/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { navigateRegions } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useSimulatedMediaQuery } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

function EditorRegions( { footer, header, sidebar, content, publish, className } ) {
	const resizableStylesheets = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getSettings().resizableStylesheets;
	}, [] );

	const deviceType = useSelect( ( select ) => {
		return select( 'core/block-editor' ).deviceType();
	} );

	const canvasWidth = ( device ) => {
		switch ( device ) {
			case 'Tablet':
				return 780;
			case 'Mobile':
				return 340;
			default:
				return 2000;
		}
	};

	const marginValue = ( device ) => {
		const viewportHeight = window.innerHeight;
		if ( viewportHeight < 800 || device === 'Tablet' ) {
			return '0';
		} else if ( viewportHeight < 950 ) {
			return '36px';
		}
		return '72px';
	};

	const inlineStyles = ( device ) => {
		switch ( device ) {
			case 'Tablet':
			case 'Mobile':
				return {
					width: canvasWidth( deviceType ),
					margin: marginValue( deviceType ) + ' auto',
					flexGrow: 0,
				};
			default:
				return null;
		}
	};

	useSimulatedMediaQuery( resizableStylesheets, canvasWidth( deviceType ) );

	return (
		<div className={ classnames( className, 'edit-post-editor-regions' ) }>
			{ !! header && (
				<div
					className="edit-post-editor-regions__header"
					role="region"
					/* translators: accessibility text for the top bar landmark region. */
					aria-label={ __( 'Editor top bar' ) }
					tabIndex="-1"
				>
					{ header }
				</div>
			) }
			<div className="edit-post-editor-regions__body">
				<div
					className="edit-post-editor-regions__content"
					role="region"
					/* translators: accessibility text for the content landmark region. */
					aria-label={ __( 'Editor content' ) }
					tabIndex="-1"
					style={ inlineStyles( deviceType ) }
				>
					{ content }
				</div>
				{ !! publish && (
					<div
						className="edit-post-editor-regions__publish"
						role="region"
						/* translators: accessibility text for the publish landmark region. */
						aria-label={ __( 'Editor publish' ) }
						tabIndex="-1"
					>
						{ publish }
					</div>
				) }
				{ !! sidebar && (
					<div
						className="edit-post-editor-regions__sidebar"
						role="region"
						aria-label={ 'Editor settings' }
						tabIndex="-1"
					>
						{ sidebar }
					</div>
				) }
			</div>
			{ !! footer && (
				<div
					className="edit-post-editor-regions__footer"
					role="region"
					aria-label={ 'Editor footer' }
					tabIndex="-1"
				>
					{ footer }
				</div>
			) }
		</div>
	);
}

export default navigateRegions( EditorRegions );
