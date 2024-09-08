declare module 'react-image-gallery' {
  import { Component } from 'react';

  export interface ImageGalleryItem {
    original: string;
    thumbnail: string;
    originalAlt?: string;
    thumbnailAlt?: string;
    originalTitle?: string;
    thumbnailTitle?: string;
    description?: string;
    renderItem?: () => JSX.Element;
    renderThumbInner?: () => JSX.Element;
  }

  export interface ImageGalleryProps {
    items: ImageGalleryItem[];
    showNav?: boolean;
    autoPlay?: boolean;
    showThumbnails?: boolean;
    showFullscreenButton?: boolean;
    showPlayButton?: boolean;
    showBullets?: boolean;
    slideDuration?: number;
    slideInterval?: number;
    slideOnThumbnailOver?: boolean;
    thumbnailPosition?: 'top' | 'right' | 'bottom' | 'left';
    renderLeftNav?: (onClick: () => void, disabled: boolean) => JSX.Element;
    renderRightNav?: (onClick: () => void, disabled: boolean) => JSX.Element;
    renderPlayPauseButton?: (onClick: () => void, isPlaying: boolean) => JSX.Element;
    renderFullscreenButton?: (onClick: () => void, isFullscreen: boolean) => JSX.Element;
  }

  export default class ImageGallery extends Component<ImageGalleryProps> {}
}
