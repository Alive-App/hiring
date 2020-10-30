module FilesSupport
  def dummy_files_dir
    Rails.root.join('spec', 'files')
  end

  def dummy_csv
    dummy_videos.first
  end

  def dummy_valid_csv
    dummy_files_dir.glob('*valid.csv')
  end

  def dummy_invalid_csv
    dummy_files_dir.glob('*invalid.csv')
  end

  def dummy_files_path filename
    dummy_files_dir.join(filename)
  end
end
  